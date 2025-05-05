import { useState } from "react";
import Star from "./Star";

export default function StarRating({totalStars}) {
    const stars = Array.from({length: totalStars})
    const [selectedStar, setSelectedStar] = useState(0);
    return (
        <div>
            {   
                stars.map((n, i) => 
                    <Star  
                        key={i} 
                        selected={selectedStar>i}
                        onSelect={() => setSelectedStar(i + 1)}
                    />)
            }
        </div>
    )
}