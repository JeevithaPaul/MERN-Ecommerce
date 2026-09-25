function Account() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <section className="auth-section">
      <div className="auth-container">
        <h2>My Account</h2>

        {user ? (
          <>
            <p>
              <strong>Name:</strong> {user.name}
            </p>

            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </>
        ) : (
          <p>Please login to view your account.</p>
        )}
      </div>
    </section>
  );
}

export default Account;