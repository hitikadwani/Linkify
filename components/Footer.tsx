import { Heart } from "lucide-react";

export default function Footer() {
    return <div>
         <footer className="py-10">
            <div className="max-w-[1500px] mx-auto w-[90%] text-center">
                <span className="flex items-center justify-center">
                    Made with <Heart className="mx-2" /> by Hitik.
                </span>
            </div>
        </footer>
    </div>
}
