import React from 'react';
import './NearbyAttractions.css';

// Import images
import teaGardenImg from '../assets/munnar_tea_garden.png';
import waterfallImg from '../assets/munnar_waterfall.png';
import damImg from '../assets/munnar_dam.png';
import viewpointImg from '../assets/munnar_viewpoint.png';

const attractions = [
    {
        name: "Eravikulam National Park",
        link: "https://maps.app.goo.gl/BbJQazpsNZziFAkB9",
        description: "Home to the endangered Nilgiri Tahr and blooming Neelakurinji flowers.",
        image: viewpointImg
    },
    {
        name: "Mattupetty Dam",
        link: "https://maps.app.goo.gl/z5Mr8C7KHXDkjP3h9",
        description: "A beautiful dam spot offering boating and scenic views.",
        image: damImg
    },
    {
        name: "Top Station",
        link: "https://maps.app.goo.gl/jjwnBDxMKkjM5oY67",
        description: "The highest point in Munnar, offering panoramic views of the Western Ghats.",
        image: viewpointImg
    },
    {
        name: "Attukal Waterfalls",
        link: "https://maps.app.goo.gl/kmS6ihhv4VYagong8",
        description: "A scenic waterfall surrounded by rolling hills and lush greenery.",
        image: waterfallImg
    },
    {
        name: "Lakkam Waterfalls",
        link: "https://maps.app.goo.gl/y1UC8wfWy7KDBHNf7",
        description: "A crystal clear waterfall located in the Eravikulam National Park.",
        image: waterfallImg
    },
    {
        name: "Cheeyappara Waterfalls",
        link: "https://maps.app.goo.gl/68JiLeePZiky4YLL9",
        description: "A magnificent waterfall cascading down in seven steps.",
        image: waterfallImg
    },
    {
        name: "Tata Tea Museum",
        link: "https://maps.app.goo.gl/HLboe73Db8gXns638",
        description: "Learn about the history of tea plantations in Munnar.",
        image: teaGardenImg
    },
    {
        name: "Kanan Devan Hills Plantations",
        link: "https://maps.app.goo.gl/Sc1su9Jrs4a6QawW9",
        description: "Sprawling tea gardens perfect for a peaceful walk and photography.",
        image: teaGardenImg
    },
    {
        name: "Anayirangal Dam",
        link: "https://maps.app.goo.gl/4FLhfCnwm3uHrovE9",
        description: "A lush green carpet of tea plants surrounding a splendid dam.",
        image: damImg
    },
    {
        name: "Pothamedu Viewpoint",
        link: "https://maps.app.goo.gl/9z4oYqbDYvPpaU3p7",
        description: "Offers a panoramic view of the tea, coffee, and cardamom plantations.",
        image: teaGardenImg
    },
    {
        name: "Thommankuthu Waterfalls",
        link: "https://maps.app.goo.gl/jQJ4fp55BHSQ1pyB8",
        description: "A seven-step waterfall offering trekking opportunities.",
        image: waterfallImg
    }
];

const NearbyAttractions = () => {
    return (
        <div className="attractions-page">
            <div className="page-header">
                <div className="container">
                    <h1>Nearby Attractions</h1>
                    <p>Explore the beauty of Munnar with these popular destinations near our homestay.</p>
                </div>
            </div>

            <div className="container section">
                <div className="attractions-grid">
                    {attractions.map((place, index) => (
                        <div key={index} className="attraction-card">
                            <div className="attraction-img">
                                <img src={place.image} alt={place.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div className="attraction-info">
                                <h3>{place.name}</h3>
                                <p>{place.description}</p>
                                <a href={place.link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                                    View on Map
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NearbyAttractions;
