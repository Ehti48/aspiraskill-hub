import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  Wrapper {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .event-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    text-align: center;

    .event-content {
      width: 100%;
      max-width: 800px;
      margin: 80px auto;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      img {
        height: 100%;
      }

      h2 {
        margin: 24px 0;
        color: #252E4A;
        font-size: 20px;
        font-weight: 600;
      }
    }
    img.event-img {
      object-fit: contain;
      width: 80%;
      height: 80%;
  }

    button {
      background-color: #3282c4;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      border-radius: 5px;
      padding: 8px 22px;
      color: white;
      font-weight: 500;
      cursor: pointer;
    }

    button img {
      height: 20px;
    }

    .addPopup, .editPopup {
      width: 90%;
      max-width: 900px;
      height: 500px;
      margin: 0 auto;
      text-align: center;
      display: none;
      justify-content: start;
      align-items: center;
      flex-direction: column;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 0 0 100rem #00000080;
      position: fixed;
      top: 50%;
      left: 50%;
      padding: 25px 30px 30px;
      transform: translate(-50%, -50%);
      overflow-y: auto;
      

      h1 {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-between;
        align-items: start;
        padding: 0 0 15px 0;
        border-bottom: 1px solid #ddd;
        font-size: 20px;
        font-weight: 600;
      }

      p {
        color: #7f7f7f;
        font-weight: 300;
        cursor: pointer;
        font-size: 34px;
        height: 30px;
        margin-top: -10px;
      }

      form {
        width: 100%;
        height: auto;
        padding: 10px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
      }

      .forms-line {
        width: 100%;
        height: auto;
        /* max-height: 300px; */
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        row-gap: 20px;
      }

      .form-line {
        width: 50%;
        padding: 0 10px;
        max-width:100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        position: relative;
      }

      .paste {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 40px;
        right: 25px;
      }

      .innerForm-line {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
      }

      .innerForm-line input {
        width: 48%;
        height: 100%;
      }

      .form-btn {
        width: 100%;
        padding: 10px;
        color: white;
        border: none;
        border-radius: 5px;
        flex-direction: row;
        justify-content: end;
        align-items: center;
      }

      .form-btn button {
        width: 150px;
        height: 50px;
        padding: 10px 20px;
        margin-left: 20px;
        font-size: 18px;
        cursor: pointer;
      }

      label {
        text-align: start;
        width: 100%;
        margin-bottom: 15px;
        font-size: 14px;
        font-weight: 400;
        color: #767A7A;
      }

      input {
        width: 100%;
        padding: 12px 20px;
        background-color: #DEDEDE1A;
        border: 1px solid #ddd;
        border-radius: 5px;
        outline: none;
      }

      textarea {
        width: 100%;
        border: 1px solid #ddd;
        height: 100px;
        border-radius: 5px;
        padding: 10px;
        max-width: 380px;
        // min-width: 380px;
        min-height: 51px;
        outline: none;
      }

      .cancel-btn {
        background-color: transparent;
        border: 1px solid #3282c4;
        color: #3282c4;
      }

      .save-btn {
        background-color: #3282c4;
      }

      .link {
        position: relative;
        left: 155px;
        bottom: 35px;
      }
    }
  }
  .adding {
    width: 100%;
    height: auto;
    min-height: 90vh;
    display: flex;
    justify-content: center;
    align-items: start;
    text-align: start;
  }
  .upcoming-events {
    width: 100%;
    height: 100%;
    background: #fff;
    overflow-x: auto;
    border: 1px solid rgba(37, 46, 74, 0.1);
    border-radius: 5px;
    padding: 24px 20px;
  }

  .events-table {
    width: 100%;
    min-width: 950px; /* Ensures the table doesn't get too small */
    border-collapse: collapse;
    margin: 5px auto;
    border: 1px solid #ddd;
    border-bottom: none;

    thead {
      background-color: #ebf3fa;
      border-bottom: 1px solid #ddd;
    }

    tbody tr {
      border-bottom: 1px solid #ddd;
    }
  }

  .row {
    display: grid;
    grid-template-columns: 0.3fr 1fr 1.5fr 1.5fr 1fr 1fr;
    padding-left: 10px;
    align-items: center;
  }
  .events-table th,
  .events-table td {
    padding: 10px;
    text-align: left;
    background: transparent;
    color: #252e4a;
    font-size: 14px;
    font-weight: 400;
    border: none;
    word-wrap: break-word; 
  }

  .events-table th {
    color: #252e4a99 !important;
    font-weight: 500;
  }

  .events-table th:nth-child(3),
  .events-table td:nth-child(3) {
    max-width: 150px; /* Set the width of the Event Link column to 150px */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .events-table a {
    color: #252e4a;
    text-decoration: none;
  }

  .events-table a:hover {
    text-decoration: underline;
  }

  .actions img {
    width: 20px;
    margin: 0 5px;
    cursor: pointer;
  }

  .sr {
    width: 10px;
    background-color: blue;
  }
  .eventHeader {
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: start;

    h2 {
      color: #252e4a;
      font-size: 20px;
      font-weight: 500;
    }
  }
  .events-search {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    border-radius: 5px;
  }
  .events-search button {
    width: auto;
    height: auto;
    padding: 10px 20px;
    margin-bottom: 15px;
  }
  .deletePopup {
    width: 400px;
    max-width:100%;
    padding: 25px 0px;
    border: 1px solid #ddd;
    box-shadow: 0 0 0px 100rem #00000090;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    background-color: white;
    display: none;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    .delete-close {
      width: 30px;
      height: 30px;
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
      font-size: 20px;
      border-radius: 50%;
      border: 2px solid #ddd;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: lighter;
    }

    .close {
      width: 92%;
      display: flex;
      justify-content: flex-end;
      cursor: pointer;
      }
      .del-icon {
        width: 70px;
        height: 70px;
        background: #ff6b63;
        border-radius: 50%;
        padding: 17px;
        margin: auto;
      }

      h3 {
        margin: 15px 0 5px;
        text-align: center;
        font-size: 20px;
        font-weight: 500;
      }

      p {
        text-align: center;
        font-size: 14px;
        font-weight: 300;
      }
  }
  .deletePopup .img {
    width: 70px;
    height: 70px;
    background: red;
    border-radius: 50%;
    box-shadow: 0 0 3px black;
    object-fit: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .deletePopup h1 {
    text-align: center;
  }
  .delete-btn {
    margin: 15px 0 0 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;

    .delete-no,
    .delete-yes {
      width: 40%;
      height: 40px;
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 10px 20px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 15px;
      font-weight: 500;
    }
    .delete-no {
      border: 1px solid #3282c4;
      background: transparent;
      color: #3282c4;
      font-weight: 500;
    }
  }
  .viewPopup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 850px;
    height: 450px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: start;
    box-shadow: 0 0 0px 100rem #00000080;
    border-radius: 10px;
  }

  .modal-content {
    padding: 25px 30px 30px;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
  }

  .modal-content .close {
    width: 100%;
    padding-bottom: 15px;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;

    h2 {
      font-size: 20px;
      font-weight: 500;
      color: #000;
    }


    p{
      color: #7f7f7f;
      font-size: 34px;
      font-weight: 300;
      margin-top: -10px;
      height: 35px;
    }
  }

  .modal-content hr {
    margin-bottom: 40px;
    width: 100%;
  }

  .modal-content p {
    width: auto;
    overflow: hidden;
    max-width: 400px;
    height: auto;
    display: flex; 
    flex-direction: column;
    align-items: start;
    color: #2f2d2d;
    font-size: 14px;
    font-weight: 500;

    strong{
    color: gray;
    font-weight: 400;
    margin-bottom: 15px;

    }
    a{
    color: #2f2d2d;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    }
  }
  .view-row {
    display: flex;
    justify-content: space-between;
    flex-wrap:wrap;
    align-items: start;
    width: 90%;
    height: auto;
  }
    .viewPopup-content{
    width: 100%;
    height: 90%;
    padding: 20px 0 0px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    }
  .viewEdit-btn {
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: end;
  }
  input.search{
    max-width: 150px;
    padding: 8px 12px;
    border-radius: 3px;
    border: 1px solid #00000080;
  }
  .view-table{
    width:100%;
    overflow-x: auto;
  }
  .edit-btn {
    // width: 120px;
    // height: 50px;
    background-color: #007bff;
    color: white;
    font-size: 14px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;

    img {
      margin-right: 5px;
    }
  }
  @media (max-width:768px){
   
    .forms-line{
      flex-direction: column;
      padding: 10px;
    }
    .event-container .addPopup .form-line,.event-container .editPopup .form-line{
            width:100%;

    }
 img.link{
  display:none;
  }
  .upcoming-events .eventHeader h2{
    font-size:100%;
  }
}
`;

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventContent, setShowEventContent] = useState(true);
  const [deleteId, setDeleteId] = useState(null); // Store the id of the event to be deleted

  useEffect(() => {
    const stroredEvents = JSON.parse(localStorage.getItem("events") || '[]');
    setEvents(stroredEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const closePopup = () => {
    document.querySelector(".addPopup").style.display = "none";
  };

  const openPopup = () => {
    document.querySelector(".addPopup").style.display = "flex";
  };

  const deleteOpenPopup = (id) => {
    setDeleteId(id); // Set the id of the event to be deleted
    document.querySelector(".deletePopup").style.display = "flex";
  };

  const deleteNo = () => {
    document.querySelector(".deletePopup").style.display = "none";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventName = e.target.eventName.value;
    const eventLink = e.target.eventLink.value;
    const eventDescription = e.target.eventDescription.value;
    const eventDate = e.target.eventDate.value;
    const eventTime = e.target.eventTime.value;

    setEvents((prevEvents) => [
      ...prevEvents,
      {
        id: prevEvents.length + 1,
        name: eventName,
        link: eventLink,
        description: eventDescription,
        dateTime: `${eventDate} ${eventTime}`,
      },
    ]);

    e.target.reset();
    closePopup();
    setShowEventContent(false); // Hide event content after adding an event
  };

  const handleDelete = () => {
    // Remove the event with the specified deleteId
    const updatedEvents = events.filter((event) => event.id !== deleteId);

    // Reassign serial numbers (S.No)
    const reorderedEvents = updatedEvents.map((event, index) => ({
      ...event,
      id: index + 1,
    }));

    setEvents(reorderedEvents); // Update the state
    setDeleteId(null); // Reset deleteId
    deleteNo(); // Close the delete popup
  };

  const handleEdit = (id) => {

    const eventToEdit = events.find((event) => event.id === id);
    if (eventToEdit) {
      setSelectedEvent(eventToEdit); // Set the selected event data
      document.querySelector(".editPopup").style.display = "flex"; // Show the edit popup
    }

    setShowModal(false);
  };

  const closeEditPopup = () => {
    document.querySelector(".editPopup").style.display = "none"; // Close the edit popup
    setSelectedEvent(null); // Clear selected event data
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedName = e.target.eventName.value;
    const updatedLink = e.target.eventLink.value;
    const updatedDescription = e.target.eventDescription.value;
    const updatedDate = e.target.eventDate.value;
    const updatedTime = e.target.eventTime.value;

    const updatedEvent = {
      ...selectedEvent,
      name: updatedName,
      link: updatedLink,
      description: updatedDescription,
      dateTime: `${updatedDate} ${updatedTime}`,
    };

    const updatedEvents = events.map((event) =>
      event.id === selectedEvent.id ? updatedEvent : event
    );

    setEvents(updatedEvents); // Update the events list
    closeEditPopup(); // Close the popup
  };


  const handleView = (event) => {
    setSelectedEvent(event); // Set the selected event data
    setShowModal(true); // Show the modal
  };

  const closeModal = () => {
    setSelectedEvent(null); // Clear the selected event data
    setShowModal(false); // Hide the modal
    console.log("Modal closed");
    document.querySelector(".deletePopup").style.display = "none";
  };
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Wrapper>
      <div className="event-container">
        {filteredEvents.length > 0 ? (
          <div className="adding">
            <div className="upcoming-events">
              <div className="eventHeader">
                <h2>Upcoming Events</h2>
                <div className="events-search">
                  <button onClick={openPopup}>
                    + Add Event
                  </button>
                  <input
                    type="search"
                    placeholder="Search"
                    className="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="view-table">
                <table className="events-table">
                  <thead>
                    <tr className="table-header row">
                      <th className="sr">#</th>
                      <th>Event Name</th>
                      <th>Event Link</th>
                      <th>Description</th>
                      <th>Date & Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.length > 0 ? (
                      filteredEvents.map((event) => (
                        <tr className="row" key={event.id}>
                          <td>{event.id}</td>
                          <td>{event.name}</td>
                          <td>
                            <a href="#" onClick={() => handleView(event)}>
                              {event.link}
                            </a>
                          </td>
                          <td>{event.description}</td>
                          <td>{event.dateTime}</td>
                          <td className="actions">
                            <img
                              src="https://admin.aspiraskillhub.aspirasys.com/images/eye.png"
                              alt="View"
                              onClick={() => handleView(event)}
                            />
                            <img
                              src="https://admin.aspiraskillhub.aspirasys.com/images/edit-2.png"
                              alt="Edit"
                              onClick={() => handleEdit(event.id)}
                            />
                            <img
                              src="https://admin.aspiraskillhub.aspirasys.com/images/trash.png"
                              alt="Delete"
                              onClick={() => deleteOpenPopup(event.id)}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                          No data available in the table
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        ) : (

          <div className="event-content">
            <img src="https://admin.aspiraskillhub.aspirasys.com/images/events.png" />
            <h2>
              "No Events & Info Found"
            </h2>
            <button onClick={openPopup}>
              + Add Event
            </button>
          </div>
        )}
        <div className="deletePopup">
          <span onClick={deleteNo} className="close" >
            <p><img src="https://admin.aspiraskillhub.aspirasys.com/images/close-circle.png" alt="" /></p>
          </span>
          <div class="del-icon">
            <img src="https://admin.aspiraskillhub.aspirasys.com/images/mdi_trash.png" alt="delete"/>
          </div>
          <h3>Are You Sure?</h3>
          <p>To delete the Weekly event</p>
          <div className="delete-btn">
            <button className="delete-no" onClick={deleteNo}>
              No
            </button>
            <button className="delete-yes" onClick={handleDelete}>
              Yes, delete
            </button>
          </div>
        </div>
        <div className="addPopup">
          <h1>
            Add Event <p onClick={closePopup}>×</p>
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="forms-line">
              <div className="form-line">
                <label htmlFor="eventName">Event Name</label>
                <input
                  type="text"
                  id="eventName"
                  name="eventName"
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div className="form-line">
                <label htmlFor="eventLink">Event Link</label>
                <input
                  type="url"
                  id="eventLink"
                  name="eventLink"
                  placeholder="Enter Link"
                  required
                />
                <div class="paste">
                  <img src="https://admin.aspiraskillhub.aspirasys.com/images/paste.png" />
                </div>
              </div>
            </div>
            <div className="forms-line">
              <div className="form-line">
                <label htmlFor="eventDescription">Event Description</label>
                <textarea
                  id="eventDescription"
                  name="eventDescription"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="form-line">
                <label htmlFor="eventDate">Event Date & Time</label>
                <div className="innerForm-line">
                  <input type="date" id="eventDate" name="eventDate" required />
                  <input type="time" id="eventTime" name="eventTime" required />
                </div>
              </div>
            </div>
            <div className="forms-line">
              <div className="form-line form-btn">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closePopup}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="editPopup">
          <h1>
            Edit Event <p onClick={closeEditPopup}>×</p>
          </h1>
          <form onSubmit={handleEditSubmit}>
            <div className="forms-line">
              <div className="form-line">
                <label htmlFor="eventName">Event Name</label>
                <input
                  type="text"
                  id="eventName"
                  name="eventName"
                  value={selectedEvent?.name || ""}
                  onChange={(e) =>
                    setSelectedEvent((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div className="form-line">
                <label htmlFor="eventLink">Event Link</label>
                <input
                  type="url"
                  id="eventLink"
                  name="eventLink"
                  value={selectedEvent?.link || ""}
                  onChange={(e) =>
                    setSelectedEvent((prev) => ({ ...prev, link: e.target.value }))
                  }
                  placeholder="Enter Link"
                  required
                />
              </div>
            </div>
            <div className="forms-line">
              <div className="form-line">
                <label htmlFor="eventDescription">Event Description</label>
                <textarea
                  id="eventDescription"
                  name="eventDescription"
                  rows="3"
                  value={selectedEvent?.description || ""}
                  onChange={(e) =>
                    setSelectedEvent((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  required
                ></textarea>
              </div>
              <div className="form-line">
                <label htmlFor="eventDate">Event Date & Time</label>
                <div className="innerForm-line">
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={selectedEvent?.dateTime?.split(" ")[0] || ""}
                    onChange={(e) =>
                      setSelectedEvent((prev) => ({
                        ...prev,
                        dateTime: `${e.target.value} ${selectedEvent?.dateTime?.split(" ")[1] || ""}`,
                      }))
                    }
                    required
                  />
                  <input
                    type="time"
                    id="eventTime"
                    name="eventTime"
                    value={selectedEvent?.dateTime?.split(" ")[1] || ""}
                    onChange={(e) =>
                      setSelectedEvent((prev) => ({
                        ...prev,
                        dateTime: `${selectedEvent?.dateTime?.split(" ")[0] || ""} ${e.target.value}`,
                      }))
                    }
                    required
                  />
                </div>
              </div>
            </div>
            <div className="forms-line">
              <div className="form-line form-btn">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeEditPopup}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
        {showModal && selectedEvent && (
          <div className="viewPopup">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                <h2>Event Detail</h2>
                <p>&times;</p>
              </span>
              <div className="viewPopup-content">
                <p>
                  <strong>Event Name:</strong> {selectedEvent.name}
                </p>
                <p>
                  <strong>Project Description:</strong>{" "}
                  {selectedEvent.description}
                </p>
                <div className="view-row">
                  <p>
                    <strong>Event Date & Time:</strong> {selectedEvent.dateTime}
                  </p>
                  <p>
                    <strong>Event Link:</strong>{" "}
                    <a
                      href={selectedEvent.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {selectedEvent.link}
                    </a>
                  </p>
                </div>
                <div className="viewEdit-btn">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(selectedEvent.id)}
                  >
                    <img
                      src="https://admin.aspiraskillhub.aspirasys.com/images/edit-project.png"
                      alt="edit-project.png"
                    />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Events;
