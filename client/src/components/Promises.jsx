const promises = [
  { title: "Delivery island-wide", text: "Tracked from the moment we pack it." },
  { title: "30-day returns", text: "Not right? Send it back, no questions." },
  { title: "Secure checkout", text: "Your payment details stay protected." },
];

const Promises = () => (
  <section className="home-promises">
    <div className="container">
      <div className="row g-4">
        {promises.map((p) => (
          <div className="col-md-4" key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Promises;
