import React from "react";
import Carousel from "./common/Carousel";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home-container">
        {/* Carousel Section */}
        <Carousel />

        {/* Tagline */}
        <div className="tagline">
          <h2>Best Online Courses</h2>
          <p>
            Explore a variety of courses tailored to help you master new skills and advance your career.
          </p>
        </div>

        {/* Course Categories Section */}
        <div className="course-categories">
          <h2>Explore Our Categories</h2>
          <div className="categories-container">
            <div className="category-card">Technology</div>
            <div className="category-card">Business</div>
            <div className="category-card">Design</div>
            <div className="category-card">Health & Fitness</div>
            <div className="category-card">Languages</div>
            <div className="category-card">Personal Development</div>
          </div>
        </div>

        {/* Featured Courses Section */}
        <div className="featured-courses">
          <h2>Featured Courses</h2>
          <div className="courses-container">
            <div className="course-card">
              <img
                src="https://images.unsplash.com/photo-1529429612779-c8e40ef2f36d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Course 1"
              />
              <h3>Introduction to Python</h3>
              <p>Learn Python programming from scratch with hands-on projects.</p>
            </div>
            <div className="course-card">
              <img
                src="https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Course 2"
              />
              <h3>Digital Marketing</h3>
              <p>Master the art of online marketing with expert strategies.</p>
            </div>
            <div className="course-card">
              <img
                src="https://plus.unsplash.com/premium_photo-1661754972151-8c18f2069982?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Course 3"
              />
              <h3>Graphic Design Basics</h3>
              <p>Discover the fundamentals of design and create stunning visuals.</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials">
          <h2>What Our Learners Say</h2>
          <div className="testimonials-container">
            <div className="testimonial-card">
              <p>
                "This platform has been a game-changer for my career. The courses are top-notch!"
              </p>
              <span>- John Doe</span>
            </div>
            <div className="testimonial-card">
              <p>
                "I love the variety of courses offered. Learning has never been this easy."
              </p>
              <span>- Jane Smith</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta">
          <h2>Ready to Start Learning?</h2>
          <p>Join thousands of learners and build your future today!</p>
          <button className="cta-button"><a href="/jobs" style={{color:"#fff"}}>Get Started</a></button>
        </div>
      </div>
    </>
  );
};

export default Home;
