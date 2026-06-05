'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { MessageSquareQuote, Star, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageShell } from '@/components/layout/page-shell';
import { AnimateIn } from '@/components/animate-in';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';

export default function AvisPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Formulaire
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Charger les avis
  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          id,
          rating,
          comment,
          created_at,
          user_id,
          profiles (
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        // Table doesn't exist or RLS issue
        console.error(error);
        throw error;
      }
      
      setReviews(data || []);
    } catch (err) {
      console.error('Erreur lors du chargement des avis:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();

    // Temps réel (Realtime)
    const channel = supabase
      .channel('public:reviews')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reviews' }, (payload) => {
        // Recharger complètement pour obtenir les profils joints, ou gérer manuellement
        fetchReviews();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Vous devez être connecté pour laisser un avis.');
      return;
    }
    if (!comment.trim()) {
      toast.error('Le commentaire ne peut pas être vide.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('reviews').insert({
        user_id: user.id,
        rating,
        comment: comment.trim(),
      });

      if (error) throw error;

      toast.success('Votre avis a été publié avec succès !');
      setComment('');
      setRating(5);
    } catch (err) {
      toast.error(err.message || 'Impossible de publier votre avis. Assurez-vous que la table "reviews" existe sur Supabase.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell title="Avis de la communauté" maxWidth="max-w-[800px]">
      <div className="space-y-8">
        <AnimateIn variant="fadeUp">
          <section className="rounded-lg border border-border/50 bg-card/80 p-6 shadow-sm backdrop-blur lg:p-8">
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
              <MessageSquareQuote className="w-8 h-8 text-primary" />
              Avis de la communauté
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Découvrez ce que les autres pensent de VixLuxia. Vos retours nous aident à améliorer la plateforme en temps réel.
            </p>
          </section>
        </AnimateIn>

        {user ? (
          <AnimateIn variant="fadeUp" delay={0.1}>
            <Card className="p-6 border-border/50 bg-card/80">
              <h2 className="font-bold mb-4">Laisser un avis</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="flex gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        className="focus:outline-none transition-transform"
                      >
                        <motion.div animate={star <= rating ? { rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] } : {}} transition={{ duration: 0.4 }}>
                          <Star className={`w-7 h-7 ${star <= rating ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'text-muted-foreground/40'}`} />
                        </motion.div>
                      </motion.button>
                    ))}
                  </div>
                </div>
                <Textarea 
                  placeholder="Partagez votre expérience avec VixLuxia..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="resize-none min-h-[100px]"
                />
                <Button type="submit" disabled={isSubmitting || !comment.trim()}>
                  {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                  Publier
                </Button>
              </form>
            </Card>
          </AnimateIn>
        ) : (
          <AnimateIn variant="fadeUp" delay={0.1}>
            <Card className="p-6 border-border/50 bg-muted/30 text-center">
              <p className="text-muted-foreground">Vous devez être connecté pour laisser un avis.</p>
            </Card>
          </AnimateIn>
        )}

        <AnimateIn variant="fadeUp" delay={0.2}>
          <div className="space-y-4">
            <h2 className="font-bold text-lg mb-4">Derniers avis ({reviews.length})</h2>
            
            {loading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center p-8 border rounded-lg border-dashed border-border/50 text-muted-foreground">
                Aucun avis pour le moment. Soyez le premier !
              </div>
            ) : (
              reviews.map((review) => (
                <Card key={review.id} className="p-5 border-border/50 bg-card/80">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 border border-border">
                        <AvatarImage src={review.profiles?.avatar_url} />
                        <AvatarFallback>{review.profiles?.full_name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{review.profiles?.full_name || 'Utilisateur Anonyme'}</p>
                        <div className="flex items-center mt-1 gap-0.5">
                          {[1, 2, 3, 4, 5].map((star, i) => (
                            <motion.div 
                              key={star}
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <Star className={`w-3.5 h-3.5 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_3px_rgba(250,204,21,0.5)]' : 'text-muted-foreground/20'}`} />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed whitespace-pre-wrap">
                    {review.comment}
                  </p>
                </Card>
              ))
            )}
          </div>
        </AnimateIn>
      </div>
    </PageShell>
  );
}
