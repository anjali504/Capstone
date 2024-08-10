import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import debounce from 'lodash.debounce';

const Events = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    fetchData(query);
  }, [location.search]);

  useEffect(() => {
    const debouncedFetch = debounce(() => {
      fetchData(searchTerm);
    }, 10); // Adjust the debounce delay as needed

    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [searchTerm]);

  const fetchData = async (query = "") => {
    try {
      const res = await fetch(`https://capstone-a5ic.onrender.com:5000/api/events/get${query ? `?query=${query}` : ""}`);
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden  px-6  text-center sm:px-16 sm:shadow-sm">
          <p className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            search Your Event
          </p>
          <form onSubmit={(e) => e.preventDefault()}>
            <label
              className="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
              htmlFor="search-bar"
            >
              <input
                id="search-bar"
                placeholder="Search by event name or category"
                name="q"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
              />
             <button
    type="submit"
    style={{ backgroundColor: '#065774' }}
    className="w-full md:w-auto px-6 py-3 hover:bg-blue-600 text-white font-bold rounded-xl transition-all"
>
    Search
</button>

            </label>
          </form>
        </div>
      </div>

      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {data.map(event => (
            <div key={event._id} className="bg-white rounded-lg overflow-hidden shadow-lg  max-w-sm">
              <div className="relative">
                {event.imageId.imageBase64 && (
                  <img 
                    className="w-full" 
                    src={`data:${event.imageId.contentType};base64,${event.imageId.imageBase64}`} 
                    alt={event.eventName} 
                  />
                )}
                <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
                  {event.eventCategory}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">{event.eventName}</h3>
                <p className="text-gray-600 text-sm mb-2">{new Date(event.date).toLocaleString()}</p>
                <p className="text-gray-600 text-sm mb-2">{event.city}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">${event.ticketPrice}</span>
                  <button 
                      style={{ backgroundColor: '#065774' }}

                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate(`/events/${event._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">Sorry, no events available.</p>
      )}
    </div>
  );
};

export default Events;
