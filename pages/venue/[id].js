/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import cities from '../../config/city-lists.json';
import Button from '../../components/Buttons/button';
import Heading from '../../components/Typography/heading';
import Paragraph from '../../components/Typography/paragraph';
import speakers from '../../config/speakers.json';
import Sponsors from '../../components/Sponsors/sponsors';
import Agenda from '../../components/Agenda/agenda';
import Guidelines from '../../components/Speaker/guideline';
import CFPdata from "../../config/cfp-data.json"
export async function getStaticProps({ params }) {
	let res = {};
	const data = cities.filter((p) => p.name === params.id);
	res = data[0];
	const getSpeakers = speakers.filter((s) => s.city === res?.name);
	res.speakers = getSpeakers[0].lists;
	res.agenda = getSpeakers[0].agenda || null;
	return {
		props: {
			city: res,
		},
	};
}

export async function getStaticPaths() {
	const paths = cities.map((city) => ({
		params: { id: city.name },
	}));
	return {
		paths,
		fallback: false,
	};
}

function Venue({ city }) {
	return (
		<div>
			<div className= {`w-full h-[500px] sm:h-[auto] ${city.name=='Online'?'bg-online':'bg-madrid'} bg-cover bg-center`}>
				<div className='w-full h-full kinda-dark items-center flex flex-col justify-between'>
					<div className='mt-[60px] container text-center flex flex-col items-center w-[1100px] lg:w-full sm:text-center'>
						{city.name=='Online'?<Heading className='text-white'>
							{city.name} {city.country}
						</Heading>:
						<Heading className='text-white'>
						{city.name}, {city.country}
					</Heading>}
						
						<Paragraph className='mt-[24px]' textColor='text-white'>{city.description}</Paragraph>

						<Heading typeStyle='lg' className='text-white mt-[24px] hover:underline'>
							<a href={city.map} target='_blank' rel="noreferrer">
    							{city.address}
  							</a>
						</Heading>
						<Heading typeStyle='lg' className='text-white mt-[24px]'>
							{city.date}
						</Heading>
						{city.ended ? <div></div>: <div className='m-[30px]'>
							{city.ticket && <a href={city.ticket} target='_blank' rel='noreferrer'>
							<Button className="px-8 m-2 w-[250px]">{city.isFree ? "Get Your Ticket" : "Register Now"}</Button>
						</a>}
						{city.cfp && <a href={city.name === 'online'? "/venue/online/register" :city.cfp}target={city.name=='Online'?"":'_blank'} rel='noreferrer'>
							<Button className="px-8 m-2 w-[250px]">Apply to be a speaker</Button>
						</a>}
						</div>}
					</div>
				</div>
			</div>
			{city.ended ?  (city.recordings && 
			<div className=' my-10 px-40 sm:px-5 flex justify-center flex-col items-center w-[100%] h-[500px] sm:h-72'>
				<h1 className='text-white font-bold text-5xl mb-10'>Recordings</h1>
				<iframe width="100%" height="100%" src="https://www.youtube.com/embed/videoseries?si=92z0xOVroBuDUvMR&amp;list=PLbi1gRlP7pig77jJD2ER9wfTxPSzBrLW5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
			</div>
		    ) : <div></div>}
			<div
				id='agenda'
				className='border border-x-0 border-b-0 border-t-[#333] py-28 container flex flex-col justify-center items-center '
			>
				{city.cfp ? <div className='w-[1090px] lg:w-full'>
				<Guidelines talkDeadLine={(city.name=='Online' && CFPdata.CallEndDate) || city.cfpdate} virtual={city.name=='Online'} name={city.name} cfp={city.cfp}/>
				</div> : <div className='w-[1130px] lg:w-full'>
					<Agenda city={city} />
				</div>}
			</div>
			<div
				id='sponsors'
			>
				<Sponsors imgs={city.sponsors} />
			</div>
		</div>
	);
}

export default Venue;
