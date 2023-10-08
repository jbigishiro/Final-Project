import React, { useState } from 'react';

const AddReview = () => {
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      content,
    };

    fetch('/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReview),
    })
      .then((response) => {
        console.log('Response:', response);
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
            throw new Error(errorData.errors);
          });
        }
      })
      .then(() => {
        console.log('Review sent successful');
        setContent('');
        setErrors(''); // Clear errors
      })
      .catch((error) => {
        console.error('Review failed', error.message); // Log the error message
        setErrors(error.message); // Set the error message in state
      });
  };

  return (
    <div>
      <h3>Add a New Review</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            rows="6"
            cols="40"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button style={{background: "yellow"}} type="submit">Submit Review</button>
      </form>
      {errors && <div>{errors}</div>}
    </div>
  );
};

export default AddReview;
