import bombImg from '../assets/bomb.png';
import cardCashImg from '../assets/card-cash.png';
import zeroImg from '../assets/zero.png';
import x2Img from '../assets/x2.png';
import stopImg from '../assets/stop.png';

export const cardData = [
    {
      "src": bombImg,
      "cash": null,
      "id": "1"
    },
    {
      "src": cardCashImg,
      "cash": 100,
      "id": "2"
    },
    {
      "src": cardCashImg,
      "cash": 500,
      "id": "3"
    },
    {
      "src": cardCashImg,
      "cash": 1000,
      "id": "4"
    },
    {
      "src": cardCashImg,
      "cash": 10000,
      "id": "5"
    },
    {
      "src": cardCashImg,
      "cash": 1000000,
      "id": "6"
    },
    {
      "src": zeroImg,
      "cash": 0,
      "id": "7"
    },
    {
      "src": x2Img,
      "cash": null,
      "id": "8",
      "x2": true
    },
    {
      "src": stopImg,
      "cash": null,
      "id": "9",
      "stop": true
    }
  ]