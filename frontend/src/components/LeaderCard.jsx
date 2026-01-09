import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BadgeCheck, MapPin, Briefcase, ThumbsUp, ThumbsDown } from "lucide-react";

const LeaderCard = ({ leader, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="card-elevated rounded-2xl overflow-hidden border border-border"
    >
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10">
        <img
          src={leader.image}
          alt={leader.name}
          className="w-full h-full object-cover"
        />
        {leader.verified && (
          <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <BadgeCheck className="w-3.5 h-3.5" />
            Verified
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              {leader.name}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5" />
              {leader.position}
            </p>
          </div>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
            {leader.party}
          </span>
        </div>

        <p className="text-sm text-muted-foreground flex items-center gap-1 mb-4">
          <MapPin className="w-3.5 h-3.5" />
          {leader.constituency}
        </p>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
          <div className="flex items-center gap-1.5 text-sm">
            <ThumbsUp className="w-4 h-4 text-secondary" />
            <span className="font-medium">{leader.upvotes}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <ThumbsDown className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{leader.downvotes}</span>
          </div>
          <div className="ml-auto">
            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full"
                style={{
                  width: `${(leader.upvotes / (leader.upvotes + leader.downvotes)) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        <Link to={`/leader/${leader.id}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
          >
            View Profile
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default LeaderCard;
