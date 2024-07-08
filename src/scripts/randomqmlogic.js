import { useEffect, useState } from 'react';

const quotesURL = "https://type.fit/api/quotes";
const colors = ["bg-primary", "bg-secondary", "bg-success", "bg-danger", "bg-info"];

export const useQuote = () => {
  const [quote, setQuote] = useState(null);
  const [visible, setVisible] = useState(true);
  const [bgColor, setBgColor] = useState(colors[0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(quotesURL);
        if (!res.ok) {
          throw new Error("Quote not found");
        }
        const data = await res.json();
        showQuote(data);
      } catch (err) {
        console.log("ERROR: ", err.message);
      }
    };

    const showQuote = (data) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      let { text, author } = data[randomIndex];
      // WHY IT DOESN'T REPLACE EVERY TIME ? WHYYYYYYYYYY      
      author = author.replace(', type.fit', '');
      //console.log(author);

      setQuote({ text, author });
      setVisible(true);
      setBgColor(colors[Math.floor(Math.random() * colors.length)]);
    };

    fetchData();

    const btnQuote = document.getElementById("new-quote");
    if (btnQuote) {
      btnQuote.addEventListener("click", () => {
        setVisible(false);
        setTimeout(() => {
          fetchData();
        }, 500); 
      });
    }

    return () => {
      if (btnQuote) {
        btnQuote.removeEventListener("click", fetchData);
      }
    };
  }, []);

  return { quote, visible, bgColor };
};
