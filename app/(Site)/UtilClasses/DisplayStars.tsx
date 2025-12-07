import { FaRegStar, FaStar } from "react-icons/fa";

const displayStars = (stars: number) => {
  const starIcons = [];
  for (let i = 1; i < 6; i++) {
    if (i <= stars) {
      starIcons.push(<FaStar key={i} />);
    } else {
      starIcons.push(<FaRegStar key={i} />);
    }
  }
  return starIcons;
};

export default displayStars;
