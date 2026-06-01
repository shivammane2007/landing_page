import { Button } from "@/components/ui/button";
import { Mail, Send, AtSign, Share2 } from "lucide-react";
import { FaLinkedin, FaYoutube } from "react-icons/fa";

const ButtonSocialIconDemo = () => {
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      {/* mail */}
      <Button
        variant="outline"
        size="icon"
        type="button"
        className="rounded-2xl h-12 w-12 hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-pointer bg-white border-gray-200 shadow-sm"
      >
        <Mail strokeWidth={1.5} className="h-5 w-5 text-gray-500" />
      </Button>
      {/* send */}
      <Button
        variant="outline"
        size="icon"
        type="button"
        className="rounded-2xl h-12 w-12 hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-pointer bg-white border-gray-200 shadow-sm"
      >
        <Send strokeWidth={1.5} className="h-5 w-5 text-gray-500" />
      </Button>
      {/* at sign */}
      <Button
        variant="outline"
        size="icon"
        type="button"
        className="rounded-2xl h-12 w-12 hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-pointer bg-white border-gray-200 shadow-sm"
      >
        <AtSign strokeWidth={1.5} className="h-5 w-5 text-gray-500" />
      </Button>
      {/* share */}
      <Button
        variant="outline"
        size="icon"
        type="button"
        className="rounded-2xl h-12 w-12 hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-pointer bg-white border-gray-200 shadow-sm"
      >
        <Share2 strokeWidth={1.5} className="h-5 w-5 text-gray-500" />
      </Button>
      {/* linkedin */}
      <Button
        variant="outline"
        size="icon"
        type="button"
        className="rounded-2xl h-12 w-12 hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-pointer bg-white border-gray-200 shadow-sm"
      >
        <FaLinkedin className="h-5 w-5 text-gray-500" />
      </Button>
      {/* youtube */}
      <Button
        variant="outline"
        size="icon"
        type="button"
        className="rounded-2xl h-12 w-12 hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-pointer bg-white border-gray-200 shadow-sm"
      >
        <FaYoutube className="h-5 w-5 text-gray-500" />
      </Button>
    </div>
  );
};

export default ButtonSocialIconDemo;
