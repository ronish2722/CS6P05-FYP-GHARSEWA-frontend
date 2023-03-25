import React, { useState } from "react";
import axios from "axios";

function BookProfessional(props) {
  const [bookDate, setBookDate] = useState("");
  const [bookTime, setBookTime] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post(`/book/${props.professional.id}/`, {
        book_date: bookDate,
        book_time: bookTime,
      })
      .then((response) => {
        if (response.data.success) {
          setMessage(response.data.message);
          setBookDate("");
          setBookTime("");
        } else {
          setMessage(response.data.message);
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Book {props.professional.name}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="date"
            value={bookDate}
            onChange={(e) => setBookDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Time:
          <input
            type="time"
            value={bookTime}
            onChange={(e) => setBookTime(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Book now</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default BookProfessional;
