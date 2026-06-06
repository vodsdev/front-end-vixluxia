'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { MessageSquareQuote, Star, Send, Loader2, Sparkles, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`id, rating, comment, created_at, user_id, profiles ( full_name, avatar_url )`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    const channel = supabase.channel('public:reviews').on('postgres_changes', { event: '*', schema: 'public', table: 'reviews' }, () => {
      fetchReviews();
    }).subscribe();

    return () => supabase.removeChannel(channel);
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
      toast.error(err.message || 'Impossible de publier votre avis.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell title="Avis de la communauté" maxWidth="max-w-[1000px]">
      <div className="space-y-12 pb-24">
        {/* Header Section */}
        <section className="relative overflow-hidden rounded-3xl border border-border/50 bg-card p-10 shadow-2xl backdrop-blur-xl">
          <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-gradient-to-br from-violet-500/20 to-orange-400/20 rounded-full blur-[100px] pointer-events-none" />
          <AnimateIn variant="fadeUp">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6">
                <Sparkles className="w-4 h-4" /> La voix de la communauté
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                Vos retours font grandir <span className="bg-gradient-to-r from-violet-400 to-orange-400 bg-clip-text text-transparent">VixLuxia</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Découvrez ce que les autres développeurs pensent de la plateforme et partagez votre propre expérience en temps réel.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Col 1: Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-24">
              {user ? (
                <AnimateIn variant="fadeUp" delay={0.1}>
                  <Card className="p-8 rounded-3xl border-border/50 shadow-xl bg-card/60 backdrop-blur-md">
                    <h2 className="text-2xl font-bold mb-6">Laisser un avis</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-muted-foreground">Quelle est votre note ?</label>
                        <div className="flex gap-2 p-4 bg-muted/30 rounded-2xl w-fit">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                              key={star}
                              type="button"
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              onClick={() => setRating(star)}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              className="focus:outline-none transition-transform"
                            >
                              <Star className={`w-8 h-8 transition-colors ${star <= (hoverRating || rating) ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]' : 'text-muted-foreground/30'}`} />
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-muted-foreground">Votre message</label>
                        <Textarea 
                          placeholder="Partagez votre expérience, vos coups de cœur ou suggestions..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="resize-none min-h-[140px] rounded-2xl bg-background/50 border-border focus-visible:ring-primary/30"
                        />
                      </div>
                      <Button type="submit" size="lg" className="w-full rounded-2xl bg-gradient-to-r from-violet-500 to-orange-400 hover:from-violet-600 hover:to-orange-500 text-white shadow-xl shadow-orange-500/20" disabled={isSubmitting || !comment.trim()}>
                        {isSubmitting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
                        {isSubmitting ? 'Publication...' : 'Publier mon avis'}
                      </Button>
                    </form>
                  </Card>
                </AnimateIn>
              ) : (
                <AnimateIn variant="fadeUp" delay={0.1}>
                  <Card className="p-10 rounded-3xl border-border/50 bg-gradient-to-br from-card to-muted/20 text-center shadow-xl">
                    <MessageSquareQuote className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Rejoignez la discussion</h3>
                    <p className="text-muted-foreground text-sm">Vous devez être connecté pour partager votre expérience.</p>
                  </Card>
                </AnimateIn>
              )}
            </div>
          </div>

          {/* Col 2: Reviews List */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-bold text-2xl flex items-center gap-3">
              Derniers avis <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">{reviews.length}</span>
            </h2>
            
            {loading ? (
              <div className="flex justify-center p-12">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center p-12 border-2 border-dashed border-border/50 rounded-3xl bg-muted/10 text-muted-foreground">
                Aucun avis pour le moment. Soyez le premier à illuminer cette section !
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {reviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="p-6 md:p-8 rounded-3xl border-border/50 bg-card/40 backdrop-blur-sm hover:bg-card/80 transition-colors shadow-sm relative overflow-hidden group">
                        <Quote className="absolute -right-4 -top-4 w-24 h-24 text-muted/20 rotate-12 group-hover:text-primary/5 transition-colors" />
                        <div className="relative z-10">
                          <div className="flex items-center gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.5)]' : 'text-muted-foreground/20'}`} />
                            ))}
                          </div>
                          <p className="text-base md:text-lg leading-relaxed whitespace-pre-wrap mb-6 font-medium text-foreground/90">
                            "{review.comment}"
                          </p>
                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10 border-2 border-primary/20">
                                <AvatarImage src={review.profiles?.avatar_url} />
                                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-orange-400 text-white">
                                  {review.profiles?.full_name?.charAt(0) || 'U'}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-bold text-sm">{review.profiles?.full_name || 'Utilisateur Anonyme'}</p>
                                <span className="text-xs text-muted-foreground">Développeur</span>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground/60 font-medium bg-muted/50 px-3 py-1 rounded-full">
                              {new Date(review.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
