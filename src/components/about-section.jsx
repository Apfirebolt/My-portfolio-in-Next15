"use client";

import React from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <motion.div
          className="card my-4 py-4 px-6 border bg-white rounded shadow"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold my-3">
            "My screen time is reserved for real life."
          </h2>
          <p>
            Everyone around me seems to love watching movies and TV shows. I am
            not a big fan of them. I'd often watch movies with my friends and
            family but I don't have a habit of watching them alone. I'd often
            watch movies in theaters with my friends and family and there would
            often be a big gap between the movies I watch. I am a big fan of
            Marvel and DC movies and have watched most of them. My favorite
            movies are Avengers Endgame, LOTR, The Dark Knight, Harry Potter
            Series, Inception, Good Will Hunting, The Shawshank Redemption,
            original Spider-Man .
          </p>
          <p className="mt-5">
            In bollywood I'd often watch movies which have a good storyline and
            acting. I'd really think a lot before watching a movie because I
            believe that time is precious and I don't want to waste it on
            something that doesn't add value to my life.
          </p>
        </motion.div>
        <motion.div
          className="card my-4 py-4 px-6 border bg-white rounded shadow"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold my-3">
            "Travel is the air I breathe"
          </h2>
          <p>
            I simply love to travel and explore new places. I have been to
            various places in India and have also traveled to Europe. I'd often
            take a break from my work and go on a trip to some new place. I
            believe that traveling is the best way to learn about different
            cultures, meet new people, and experience new things. I have a
            bucket list of places that I want to visit and I am slowly ticking
            them off one at a time. I aim to visit all the UNESCO World Heritage
            Sites in India and explore the beauty of nature and ancient
            architecture. I've been to 24/42 such destinations as of now.
          </p>
          <p className="mt-5">
            I'd often go on solo trips and explore new places on my own. I
            believe that solo travel is the best way to learn about oneself and
            grow as an individual. At the time of writing this, I've already
            been to 20+ solo trips in my life covering 60+ cities in India.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <motion.div
          className="card my-4 py-4 px-6 border bg-white rounded shadow"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold my-3">
            "Music is the essence of my spirit"
          </h2>
          <p>
            I love listening to music and it is an integral part of my life. I
            would often listen to instrumental music while I'm working or
            traveling. I believe that music has the power to heal and soothe the
            soul. I have a diverse taste in music and enjoy listening to various
            genres such as Classical, Jazz, Rock, and Pop. I also enjoy playing
            the Guitar and Piano. I've been learning to play those instruments
            for a few months now with little success. I am into Bollywood music
            especially the ones from 2003-2013. I've grown up listening to those
            songs on 9XM. They are still part of my playlist and I often listen
            to them while working or traveling. I've a special liking for slow
            romantic songs. I'd often try to sing those and create covers of
            them. My favorite singers are Arijit Singh, Mohit Chauhan, Sonu
            Nigam, and Shreya Ghoshal.
          </p>
          <p className="mt-5">
            I also enjoy Western Music and have a special liking for bands like
            Backstreet Boys, One Direction, Linkin Park, The Chainsmokers 3 Days
            Grace and Breaking Benjamin. My favorite singers are Ed Sheeran,
            Taylor Swift, Ellie Goulding, Katy Perry, Enrique Iglesias, Shakira
            and more.
          </p>
        </motion.div>

        <motion.div
          className="card my-4 py-4 px-6 border bg-white rounded shadow"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold my-3">
            "My penchant for Photography and Video editing"
          </h2>
          <p>
            I think most people who travel have a natural inclination towards
            photography. I am no different. I love capturing moments and
            creating memories through photographs. I have a keen interest in
            photography and enjoy clicking pictures of landscapes, architecture,
            and people. I believe that photography is a form of art that allows
            you to express yourself and capture the beauty of the world around
            you. I have a collection of photographs from my travels that I
            cherish and look back on fondly. I also enjoy editing photos and
            creating collages and albums to preserve my memories.
          </p>
          <p className="mt-5">
            I am also into video editing and have created various videos for my
            personal projects and travel diaries. I enjoy the process of editing
            videos and adding effects and music to create a visually appealing
            story. I believe that video editing is a creative process that
            allows you to tell a story and evoke emotions through visuals and
            sound. I have created videos for my travel diaries, personal
            projects, and events. I enjoy experimenting with different editing
            styles and techniques to create unique and engaging videos. I've
            worked with Softwares such as Adobe Premiere Pro, After Effects,
            Wondershare Filmora and Movavi Creative Suite for video editing.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <motion.div
          className="card my-4 py-4 px-6 border bg-white rounded shadow"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold my-3">
            "Games and Sports I am into"
          </h2>
          <p>
            I'm pretty much average in sports but I do enjoy playing them. I
            have played Cricket, Badminton, Table Tennis, and Football. I enjoy
            watching Tennis and Football matches on TV and had been following
            the matches previously in the era of big 3. I have a special liking
            for Roger Federer, Rafael Nadal and Novak Djokovic, in Tennis. I
            don't think we'd ever see 3 players of their caliber in the same era
            again. I also used to regularly follow football when Real Madrid was
            at its peak with Cristiano Ronaldo, Kaka, Modric, Kroos, Benzema,
            Bale, Ramos, Marcelo, Casillas, and more. I've stopped following
            sports lately but do enjoy watching Crickt matches occasionally with
            my friends and family.
          </p>
          <p className="mt-5">
            I have also played games like Chess, Carrom, Ludo, Snakes and
            Ladders, Monopoly, and Uno. I enjoy playing board games with my
            friends and family and it is a great way to spend quality time
            together. I have a competitive spirit and enjoy the thrill of
            winning a game. I believe that games teach you important life skills
            such as strategy, teamwork, and sportsmanship.
          </p>
        </motion.div>

        <motion.div
          className="card my-4 py-4 px-6 border bg-white rounded shadow"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold my-3">"I ❤️ Cooking"</h2>
          <p>
            Cooking is one of my favorite hobbies and I enjoy experimenting with
            different cuisines and recipes. I believe that cooking is a form of
            art that allows you to express yourself and create something
            delicious from scratch.
          </p>
          <p className="mt-5">
            I like to cook mostly Indian dishes. But, I do occasionally try my
            hand at other cuisines like Chinese and Italian. I enjoy cooking for
            my friends and family and love to see the smiles on their faces when
            they taste my food. I remember it was during the lockdown that I
            started cooking and experimenting with new recipes because we were
            forced to. I started with cooking Pizza and vegetable Pulao and
            since then haven't looked back. I'd often refer Youtube cooking
            channels especializing in Indian cuisine for new recipes and try
            them out. I believe that cooking is a great way to relax and unwind
            after a long day and it is a skill that everyone should learn. I'd
            often close or open my day with a cooking session.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
