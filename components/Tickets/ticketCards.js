import React from 'react';
import Button from '../Buttons/button';

function TicketCards({ className, city }) {
  // Determine card style based on event status
  const isEndedOrUpcoming = city.ended || !city.ticket;
  const cardOpacity = isEndedOrUpcoming ? 'opacity-40' : 'opacity-100';
  const buttonText = city.isFree ? 'Get Your Ticket' : 'Buy Now';

  return (
    <div className={`w-[300px] lg:w-full ${cardOpacity} hoverEffect h-[400px] cursor-pointer flex flex-col text-white justify-between rounded-lg card bg-white lg:m-0 m-4 ${className}`}>
      <div className="p-4 h-[100%] bg-cover relative">
          <div className="absolute inset-0 bg-cover" style={{ backgroundImage: `url(${city.img})`, opacity: 0.2, zIndex: -1 }}></div>
          <div className='text-xl font-bold text-gradient'>{city.name}, {city.country}
          </div>
          <div className='mt-2 text-lg mb-2'>{city.date}</div>
          <p className='border-t pt-2'>{city.description}</p>
      </div>

      <div className='flex justify-center border-t h-20 border-dashed p-4 text-center'>
        {/* Show a button based on the event status */}
        {isEndedOrUpcoming ? (
          <Button disabled overlay={true} className='w-[200px] bg-gray-400'>
            {city.ended ? 'Ended' : 'Coming soon'}
          </Button>
        ) : (
          <a href={city.ticket} target='_blank' rel='noreferrer'>
            <Button className='w-[200px]'>{buttonText}</Button>
          </a>
        )}
      </div>
    </div>
  );
}

export default TicketCards;
