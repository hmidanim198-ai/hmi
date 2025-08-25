<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Weight Loss Transformation</title>
  <style>
    * {margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif;}
    body {color: #333; background: #f9f9f9;}

    /* HERO */
    .hero {
      background: url("https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1600&q=80") no-repeat center/cover;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      color: white;
      padding: 20px;
    }
    .hero h1 {font-size: 3rem; margin-bottom: 15px;}
    .hero p {font-size: 1.3rem; margin-bottom: 20px;}
    .cta {
      background: #ff6f61;
      padding: 15px 40px;
      border: none;
      border-radius: 30px;
      color: white;
      font-size: 1.1rem;
      cursor: pointer;
      transition: 0.3s;
    }
    .cta:hover {background: #e85a4f;}

    /* SECTIONS */
    section {
      padding: 70px 20px;
      max-width: 1100px;
      margin: auto;
      text-align: center;
    }
    section h2 {font-size: 2.2rem; color: #56ab2f; margin-bottom: 20px;}
    section p {font-size: 1.1rem; margin-bottom: 30px;}

    /* FEATURES */
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 25px;
    }
    .card {
      background: white;
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    .card h3 {margin-bottom: 10px; color: #ff6f61;}

    /* TESTIMONIALS */
    .testimonials {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
    }
    .testimonial {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      max-width: 300px;
    }
    .testimonial img {
      width: 70px; height: 70px;
      border-radius: 50%;
      margin-bottom: 10px;
    }
    .testimonial p {font-size: 0.95rem; margin-bottom: 10px;}
    .testimonial h4 {color: #56ab2f;}

    /* BUTTON CENTER */
    .cta-center {
      margin-top: 40px;
    }

    /* FOOTER */
    footer {
      background: #333;
      color: white;
      text-align: center;
      padding: 20px;
      margin-top: 50px;
    }
  </style>
</head>
<body>

  <!-- HERO -->
  <div class="hero">
    <h1>Lose Weight. Gain Confidence.</h1>
    <p>Discover the fastest and safest way to transform your body.</p>
    <a href="YOUR_CPA_LINK_HERE"><button class="cta">Get Started Now</button></a>
  </div>

  <!-- FEATURES -->
  <section>
    <h2>Why This Works</h2>
    <div class="features">
      <div class="card">
        <h3>🔥 Burn Fat Fast</h3>
        <p>Simple and proven methods to help you lose weight quickly.</p>
      </div>
      <div class="card">
        <h3>🥗 Easy Meal Plans</h3>
        <p>Healthy and delicious recipes that fit your lifestyle.</p>
      </div>
      <div class="card">
        <h3>🏋️ Stay Motivated</h3>
        <p>Daily tips and guidance to keep you on track.</p>
      </div>
    </div>
    <div class="cta-center">
      <a href="YOUR_CPA_LINK_HERE"><button class="cta">Claim Your Free Guide</button></a>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section>
    <h2>Real Success Stories</h2>
    <div class="testimonials">
      <div class="testimonial">
        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User">
        <p>"I lost 12kg in 2 months! This method really works."</p>
        <h4>- Sarah</h4>
      </div>
      <div class="testimonial">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User">
        <p>"I feel more confident and energetic than ever."</p>
        <h4>- John</h4>
      </div>
    </div>
    <div class="cta-center">
      <a href="YOUR_CPA_LINK_HERE"><button class="cta">Join The Movement</button></a>
    </div>
  </section>

  <footer>
    <p>&copy; 2025 Weight Loss Program | All Rights Reserved</p>
  </footer>

</body>
</html>
