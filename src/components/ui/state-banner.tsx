import {
  RefreshCcwIcon,
  Car,
  Hotel,
  Bus,
  Plane,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangleIcon } from "../IconComponents";

interface BannerProps {
  icon?: React.ReactNode;
  title: string | string[];
  description: string | string[];
  callBack?: () => void;
  children?: React.ReactNode;
}

interface SpinnerEmptyProps extends BannerProps {
  loadingType: string | "icon" | "default";
}

function EmptyMuted({
  title,
  description,
  callBack,
  icon,
  children,
}: BannerProps) {
  return (
    <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
      <EmptyHeader>
        <EmptyMedia variant="icon">{icon}</EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {callBack && (
          <Button onClick={callBack} variant="outline" size="sm">
            <RefreshCcwIcon />
            Refresh
          </Button>
        )}
        {children}
      </EmptyContent>
    </Empty>
  );
}

function SpinnerEmpty({
  loadingType,
  title,
  description,
  callBack,
  children,
}: SpinnerEmptyProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleAvatars, setVisibleAvatars] = useState(0);

  const titles = Array.isArray(title) ? title : [title];
  const descriptions = Array.isArray(description) ? description : [description];

  const avatars = [
    {
      src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=100&fit=crop&crop=center",
      alt: "Car",
      fallback: "🚗",
    },
    {
      src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop&crop=center",
      alt: "Hotel",
      fallback: "🏨",
    },
    {
      src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100&h=100&fit=crop&crop=center",
      alt: "Bus",
      fallback: "🚌",
    },
    {
      src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&h=100&fit=crop&crop=center",
      alt: "Plane",
      fallback: "✈️",
    },
  ];

  useEffect(() => {
    if (titles.length > 1 || descriptions.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(
          (prev) => (prev + 1) % Math.max(titles.length, descriptions.length),
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [titles.length, descriptions.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleAvatars((prev) => (prev + 1) % (avatars.length + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Empty className="w-full">
      <EmptyHeader>
        {loadingType === "spinner" && (
          <EmptyMedia variant="icon">
            <Spinner />
          </EmptyMedia>
        )}
        {loadingType === "icon" && (
          <EmptyMedia variant="default">
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
              {avatars.map((avatar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: index < visibleAvatars ? 1 : 0,
                    scale: index < visibleAvatars ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Avatar>
                    <AvatarImage src={avatar.src} alt={avatar.alt} />
                    <AvatarFallback>{avatar.fallback}</AvatarFallback>
                  </Avatar>
                </motion.div>
              ))}
            </div>
          </EmptyMedia>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={`title-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <EmptyTitle>{titles[currentIndex % titles.length]}</EmptyTitle>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div
            key={`desc-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <EmptyDescription>
              {descriptions[currentIndex % descriptions.length]}
            </EmptyDescription>
          </motion.div>
        </AnimatePresence>
        {children}
      </EmptyHeader>
      <EmptyContent>
        {callBack && (
          <Button onClick={callBack} variant="outline" size="sm">
            Cancel
          </Button>
        )}
      </EmptyContent>
    </Empty>
  );
}

function ErrorEmpty({ title, description, callBack, children }: BannerProps) {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AlertTriangleIcon className="text-red-500" />
        </EmptyMedia>
        <EmptyTitle className="text-red-500">{title}</EmptyTitle>
        <EmptyDescription className="text-red-800/80">
          {description}
        </EmptyDescription>
        {children}
      </EmptyHeader>
      <EmptyContent>
        {callBack && (
          <Button onClick={callBack} variant="outline" size="sm">
            <RefreshCcwIcon />
            Try Again
          </Button>
        )}
      </EmptyContent>
    </Empty>
  );
}

export { EmptyMuted, SpinnerEmpty, ErrorEmpty };
