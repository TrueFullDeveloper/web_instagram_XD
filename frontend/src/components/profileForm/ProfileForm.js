import React, { Fragment, useState } from "react";

export const ProfileForm = ({ profileData, setEditModel }) => {
  const [profileForm, setForm] = useState({
    userName: profileData.userName,
    email: profileData.email,
    userInformation: profileData.userInformation,
  });

  const onChange = event => {
    setForm({ ...profileForm, [event.target.name]: event.target.value });
  };

  return (
    <Fragment>
      <div>
        <form onSubmit={event => event.preventDefault()}>
          <div>
            <span>Имя</span>
            <input
              type="text"
              id="userName"
              name="userName"
              value={profileForm.userName}
              onChange={onChange}
            />
            <span>Email</span>
            <input
              type="email"
              id="email"
              name="email"
              value={profileForm.email}
              onChange={onChange}
            />
            <span>Обо мне</span>
            <textarea
              type="text"
              id="userInformation"
              name="userInformation"
              value={profileForm.userInformation}
              onChange={onChange}
            />
          </div>
        </form>

        <button onClick={() => setEditModel(false)}>Закрыть</button>
      </div>
    </Fragment>
  );
};
