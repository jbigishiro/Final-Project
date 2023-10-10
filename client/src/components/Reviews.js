import React, { useState, useEffect } from 'react';

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/reviews')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setReviews(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Reviews</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <card>
          {reviews.map((review) => (
            <p key={review.id} style={{background:"white", padding:'10px', borderColor:"blue" }}>
              {review.content}
            </p>
           
          ))}
         </card>
      )}
    </div>
  );
}

export default Reviews;
