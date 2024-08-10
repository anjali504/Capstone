import React, { useState, useEffect } from 'react';
import '../stylesheet/HomePage.css';
import musicFestivalImage from '../Images/event1.png';
import artExhibitImage from '../Images/event2.png';
import comedyShowImage from '../Images/event3.png';
import cookingClassImage from '../Images/event4.png';
import outdoorAdventureImage from '../Images/event5.png';
import wineTastingImage from '../Images/event6.png';

import { ReactComponent as MusicIcon } from '../Icons/music.svg';
import { ReactComponent as FoodDrinkIcon } from '../Icons/food.svg';
import { ReactComponent as SportsIcon } from '../Icons/sports.svg';
import { ReactComponent as ArtsCultureIcon } from '../Icons/art.svg';
import { ReactComponent as ComedyIcon } from '../Icons/comedy.svg';
import { ReactComponent as EducationIcon } from '../Icons/education.svg';

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (query = "") => {
    try {
      const res = await fetch(`https://capstone-a5ic.onrender.com:5000/api/events/get${query ? `?query=${query}` : ""}`);
      const result = await res.json();
      setEvents(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const lastDayIndex = new Date(currentYear, currentMonth, daysInMonth).getDay();

  const prevDays = [];
  for (let x = firstDayIndex; x > 0; x--) {
    prevDays.push("");
  }

  const nextDays = [];
  for (let x = 1; x < 7 - lastDayIndex; x++) {
    nextDays.push("");
  }

  const daysArray = [
    ...prevDays,
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ...nextDays,
  ];

  return (
    <div className="homepage">
      <div className='home-banner'>
        <header className="hero-section">
          <div className="header-content">
            <div className="header-text">
              <h1>Discover Exciting Events Near You</h1>
              <p>Find the perfect event for any occasion and book with ease.</p>
            </div>
            <div className="header-image">
              <img src="event-banner.png" alt="Header Image" />
            </div>
          </div>
        </header>
      </div>
     
      <section className="featured-events">
        <h2>Featured Events</h2>
        <div className="event-cards">
          {events.slice(0, 3).map((event) => (
            <div className="event-card" key={event._id}>
              <div className="event-card-image">
                <img src={event.imageId ? `data:${event.imageId.contentType};base64,${event.imageId.imageBase64}` : ''} alt={event.eventName} />
              </div>
              <div className="event-card-content">
                <h3>{event.eventName}</h3>
                <div className="paraDiv">
                  <p>{new Date(event.date).toLocaleDateString()}</p>
                </div>
                <a href="/events">Learn More</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="event-categories">
        <h2>Popular Event Categories</h2>
        <div className="categories">
          <div className="category-card">
            <MusicIcon />
            <div className='category-text'>
            <h3>Music</h3>
            <p>Concerts and festivals</p>
            </div>
          </div>
          <div className="category-card">
            <FoodDrinkIcon />
            <div className='category-text'>
            <h3>Food & Drink</h3>
            <p>Tastings, classes, and more</p>
            </div>
          </div>
          <div className="category-card">
            <SportsIcon />
            <div className='category-text'>
            <h3>Sports</h3>
            <p>Tournaments and competitions</p>
            </div>
          </div>
          <div className="category-card">
            <ArtsCultureIcon />
            <div className='category-text'>
            <h3>Arts & Culture</h3>
            <p>Exhibits, shows, and more</p>
            </div>
          </div>
          <div className="category-card">
            <ComedyIcon />
            <div className='category-text'>
            <h3>Comedy</h3>
            <p>Standup, improv, and more</p>
            </div>
          </div>
          <div className="category-card">
            <EducationIcon />
            <div className='category-text'>
            <h3>Education</h3>
            <p>Workshops, classes, and more</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-stone-50">
        <div className="bg-sky-400 w-full sm:w-40 h-40 rounded-full absolute top-1 opacity-20 max-sm:right-0 sm:left-56 z-0"></div>
        <div className="bg-emerald-500 w-full sm:w-40 h-24 absolute top-0 -left-0 opacity-20 z-0"></div>
        <div className="bg-purple-600 w-full sm:w-40 h-24 absolute top-40 -left-0 opacity-20 z-0"></div>
        <div className="w-full py-24 relative z-10 backdrop-blur-3xl">
          <div className="w-full max-w-7xl mx-auto px-2 lg:px-8">
            <div className="grid grid-cols-12 gap-8 max-w-4xl mx-auto xl:max-w-full">
              <div className="col-span-12 xl:col-span-5">
                <h2 className="font-manrope text-3xl leading-tight text-gray-900 mb-1.5">Upcoming Events</h2>
                <p className="text-lg font-normal text-gray-600 mb-8">Don’t miss schedule</p>
                <div className="flex gap-5 flex-col">
                  {events.slice(0, 3).map(event => (
                    <div className="p-6 rounded-xl bg-white" key={event._id}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                          <p className="text-base font-medium text-gray-900">{new Date(event.date).toLocaleDateString()} - {event.time}</p>
                        </div>
                        <div className="dropdown-event relative inline-flex">
                          <button type="button" data-target="dropdown-default" className="dropdown-toggle inline-flex justify-center py-2.5 px-1 items-center gap-2 text-sm text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:text-purple-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="4" viewBox="0 0 12 4" fill="none">
                              <path d="M1.85624 2.00085H1.81458M6.0343 2.00085H5.99263M10.2124 2.00085H10.1707" stroke="currentcolor" strokeWidth="2.5" strokeLinecap="round"></path>
                            </svg>
                          </button>
                          <div id="dropdown-default" className="dropdown-menu rounded-xl shadow-lg bg-white absolute top-full -left-10 w-max mt-2 hidden" aria-labelledby="dropdown-default">
                            <ul className="py-2">
                              <li>
                                <a className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium" href="javascript:;">
                                  Edit
                                </a>
                              </li>
                              <li>
                                <a className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium" href="javascript:;">
                                  Remove
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <h6 className="text-xl leading-8 font-semibold text-black mb-1">{event.eventName}</h6>
                      <p className="text-base font-normal text-gray-600">{event.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-12 xl:col-span-7 px-2.5 py-5 sm:p-8 bg-gradient-to-b from-white/25 to-white xl:bg-white rounded-2xl max-xl:row-start-1">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <h5 className="text-xl leading-8 font-semibold text-gray-900">{new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h5>
                    <div className="flex items-center">
                      <button onClick={handlePrevMonth} className="text-indigo-600 p-1 rounded transition-all duration-300 hover:text-white hover:bg-indigo-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M10.0002 11.9999L6 7.99971L10.0025 3.99719" stroke="currentcolor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </button>
                      <button onClick={handleNextMonth} className="text-indigo-600 p-1 rounded transition-all duration-300 hover:text-white hover:bg-indigo-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M6.00236 3.99707L10.0025 7.99723L6 11.9998" stroke="currentcolor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
         
                </div>
                <div className="border border-indigo-200 rounded-xl">
                  <div className="grid grid-cols-7 rounded-t-3xl border-b border-indigo-200">
                    <div className="py-3.5 border-r rounded-tl-xl border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600">Sun</div>
                    <div className="py-3.5 border-r border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600">Mon</div>
                    <div className="py-3.5 border-r border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600">Tue</div>
                    <div className="py-3.5 border-r border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600">Wed</div>
                    <div className="py-3.5 border-r border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600">Thu</div>
                    <div className="py-3.5 border-r border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600">Fri</div>
                    <div className="py-3.5 rounded-tr-xl bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600">Sat</div>
                  </div>
                  <div className="grid grid-cols-7 rounded-b-xl">
                    {daysArray.map((day, index) => {
                      const eventForDate = events.find(event => new Date(event.date).getDate() === day && new Date(event.date).getMonth() === currentMonth && new Date(event.date).getFullYear() === currentYear);
                      return (
                        <div className={`flex xl:aspect-square max-xl:min-h-[60px] p-3.5 ${day ? 'bg-white' : 'bg-gray-50'} border-r border-b border-indigo-200 transition-all duration-300 hover:bg-indigo-50 cursor-pointer`} key={index}>
                          <span className={`text-xs font-semibold ${day ? 'text-gray-900' : 'text-gray-400'}`}>{day}</span>
                          {eventForDate && (
                            <div className="text-xs font-semibold text-gray-900 top-9 bottom-1 left-3.5 p-1.5 xl:px-2.5 h-max rounded bg-purple-50 ">
                              <p className="hidden xl:block text-xs font-medium text-purple-600 mb-px">{eventForDate.eventName}</p>
                              <span className="hidden xl:block text-xs font-normal text-purple-600 whitespace-nowrap">{eventForDate.time}</span>
                              <p className="xl:hidden w-2 h-2 rounded-full bg-purple-600"></p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
