import React from 'react';
import QuizGame from '../components/QuizGame';

const About = () => {
  return (
    <>
      <section className="about-hero animate-up">
        <h1>My Journey</h1>
        <p>Student. Athlete. Content Creator.</p>
      </section>

      <section className="content-section">
        <div className="text-content animate-up">
          <h2>How It All Started</h2>
          <p>
            My love for gaming isn't new—it deeply connects to my childhood. Growing up in the Philippines 
            surrounded by male cousins, I was always inclined to play "boy games" rather than playing with dolls. 
            The competitive spirit was always there, waiting to be unleashed.
          </p>
          <p>
            However, my journey into <strong>Mobile Legends: Bang Bang</strong> officially began during the Pandemic. 
            Stuck at home, my cousins introduced me to the game. What started as just a way to bond with them quickly 
            turned into a passion. I realized I wasn't just playing for fun—I wanted to win, and I had the skills to do it.
          </p>
        </div>
        <div className="image-content animate-up">
          <img src="/assets/profile.jpg" alt="Kate Ann Cerezo" />
          <p className="caption">It started as a hobby during the lockdown.</p>
        </div>
      </section>

      <section className="content-section gray-bg animate-up">
        <div className="image-content">
          <img src="/assets/276b6d1d-0656-43dd-abdb-20fc09f0dc7f.jpg" alt="DMMMSU-SLUC Champion Team" />
          <p className="caption">Campus Sports Olympics Champions</p>
        </div>
        <div className="text-content">
          <h2>Representing DMMMSU-SLUC</h2>
          <p>
            I started my journey as a student-athlete during my first year in college. Now that I am a 3rd-year student, 
            representing <strong>Don Mariano Marcos Memorial State University (SLUC)</strong> continues to be an absolute honor.
          </p>
          <p>
            Throughout these years, we fought hard and emerged as <strong>Champions</strong> in the Campus Sports Olympics 
            and secured <strong>Gold Medals</strong> at the University Olympics. Currently, we are training hard to represent 
            the school in the upcoming SCUAA.
          </p>
        </div>
      </section>

      <section className="content-section animate-up">
        <div className="text-content">
          <h2>Competing Outside Campus</h2>
          <p>
            Aside from school competitions, I also wanted to test my skills against other strong amateur teams. 
            That is when I joined the <strong>Smart League</strong> (All-Women's Tournament).
          </p>
          <p>
            It was a tougher battlefield, but our team managed to secure <strong>2nd Place</strong> and took home 
            a prize pool of 15,000 pesos. This experience proved to me that I could compete with the best in the region.
          </p>
        </div>
        <div className="image-content">
          <img src="/assets/e6b51848-8905-454f-899b-c4c10dfa8468.jpg" alt="Smart League Team" />
          <p className="caption">Taking on the Smart League (2nd Place)</p>
        </div>
      </section>

      <section className="timeline-section gray-bg">
        <blockquote className="animate-up">
          "As a girl with an interest in gaming, balance is key. I have a dream to graduate and find a good job, 
          so I make sure I never neglect my academics while pursuing my esports passion."
        </blockquote>

        <h2 className="animate-up" style={{marginTop: '50px'}}>My Milestones</h2>
        
        <ol className="timeline-list animate-up">
          <li><strong>2020 (Pandemic):</strong> Started playing MLBB with cousins.</li>
          <li><strong>1st Year College:</strong> Started journey as a Student-Athlete.</li>
          <li><strong>Oct 2025:</strong> Champion at Campus Sports Olympics.</li>
          <li><strong>Nov 2025:</strong> Gold Medalist at University Olympics.</li>
          <li><strong>Dec 2024:</strong> 2nd Place at Smart League (Women's).</li>
          <li><strong>Present (3rd Year):</strong> Preparing for SCUAA.</li>
        </ol>
      </section>

      <section className="content-section">
        <div className="image-content animate-up">
          <img src="/assets/0c324b7b-82ee-4d24-a326-f739beeadd12.jpg" alt="Kate Ann with friends" />
          <p className="caption">My support system outside the arena</p>
        </div>
        <div className="text-content animate-up">
          <h2>Beyond the Screen</h2>
          <p>
            Even though I spend a lot of time grinding in the Land of Dawn, I make sure to have a life outside of esports. 
            These are the people who support my journey, win or lose.
          </p>
          <p>
            I am also active on TikTok as a content creator. Recently, one of my witty videos went viral with over 400,000 views!
          </p>
          <a href="https://vt.tiktok.com/ZSadYJM2k/" target="_blank" rel="noopener noreferrer">
            <button className="action-btn">Watch Video</button>
          </a>
        </div>
      </section>

      <QuizGame />
    </>
  );
};

export default About;