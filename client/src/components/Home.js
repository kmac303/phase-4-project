function Home({user}) {
    if (user) {
      return (
      <>
      <h1>Welcome, {user.username}!</h1>
      </>
    )} else {
      return (
      <>
        <h1>Welcome to MovieReviews.com</h1>
        <h5>Please Login or Create an Account to Leave a Review</h5>
      </>
    )}
  }
  
  export default Home;
  