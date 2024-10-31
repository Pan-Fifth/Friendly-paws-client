import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const Homepage = () => {
  const [visibleSections, setVisibleSections] = useState(Array(5).fill(false)); // Track visibility for each section
  const sectionsRef = useRef([]);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      const index = parseInt(entry.target.id.split(' ')[1]) - 1; // Extract index from ID

      if (entry.isIntersecting) {
        setVisibleSections((prev) => {
          const newVisibleSections = [...prev];
          newVisibleSections[index] = true; // Set the specific section to visible
          return newVisibleSections;
        });
      } else {
        // Hide the section only if the next one is not visible
        if (index < visibleSections.length - 1 && !visibleSections[index + 1]) {
          setVisibleSections((prev) => {
            const newVisibleSections = [...prev];
            newVisibleSections[index] = false; // Set the specific section to not visible
            return newVisibleSections;
          });
        }
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3, // Trigger when 30% of the section is in view
    });

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div>
      <section id="section 1" ref={el => (sectionsRef.current[0] = el)}>
        

        <div className={`fade-in-image ${visibleSections[0] ? 'inview' : ''} h-[800px] w-full flex m-auto`}>
          <div className='w-full '>
          <img
            src="/src/assets/DogBlackMain.png"
            alt=""
            className='w-full h-full relative mx-auto z-20 '
          />
          </div>
          <div>
            <p className='text-yellow-300 text-[380px] opacity-60 absolute left-[250px] '>AD</p>
            <p className='text-purple-400 text-[380px] opacity-60 absolute right-[290px] '>PT</p>
            <em className='text-[180px] opacity-90 absolute top-[550px] right-[850px] z-30 '>ME</em>
          
          </div>
        </div>


        <span>First</span>
      </section>

      <section id="section 2" ref={el => (sectionsRef.current[1] = el)}>
        <div className={`flex gap-10 h-[800px] fade-in-image ${visibleSections[1] ? 'inview' : ''}`}>
          <div className='flex flex-1'>
            <img src="https://jaidogrescue.org/wp-content/uploads/2024/05/support-2.jpg" alt="" />
          </div>
          
          <div className='flex flex-1 text-sm flex-col gap-10 items-center justify-center'>
            <p className='text-[50px]'>About the Friendly Pow</p>
            <p className='text-[25px] tracking-wide'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, dolorem. Quaerat earum minus illum, iste fugiat voluptatibus! Eos, minus quae natus unde commodi consequatur excepturi quas, voluptatum explicabo cumque atque!</p>
            <p className='text-[25px] tracking-wide'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic voluptates veniam explicabo rem tempora cumque eum necessitatibus enim ea optio iste autem ab impedit aspernatur doloremque corrupti eos iure, molestiae facilis quisquam qui. Cupiditate aut a sapiente ipsum nobis. Dolores nam aliquam ex natus ipsa porro veniam pariatur, minus quam.</p>
          </div>
        </div>
        <span>Second</span>
      </section>

      <section id="section 3" ref={el => (sectionsRef.current[2] = el)}>
        <div className={` flex flex-col gap-10 container h-[800px] fade-in-image ${visibleSections[2] ? 'inview' : ''}`}>
          
          <div className='flex m-auto text-[60px]'>
            <p>Our friends who are looking for a house</p>
          </div>

          <div className="wgh-slider">
            <input className="wgh-slider-target" type="radio" id="slide-1" name="slider"/>
            <input className="wgh-slider-target" type="radio" id="slide-2" name="slider"/>
            <input className="wgh-slider-target" type="radio" id="slide-3" name="slider" defaultChecked />
            <input className="wgh-slider-target" type="radio" id="slide-4" name="slider"/>
            <input className="wgh-slider-target" type="radio" id="slide-5" name="slider"/>
            <div className="wgh-slider__viewport">
              <div className="wgh-slider__viewbox">
                <div className="wgh-slider__container">
                  <div className="wgh-slider-item">
                    <div className="wgh-slider-item__inner">
                      <figure className="wgh-slider-item-figure">
                        <img className="wgh-slider-item-figure__image" src="https://usercontent.one/wp/dogrescuethailand.com/wp-content/uploads/2023/06/el1-scaled-e1685610902204.jpeg?media=1660398864" alt="Alla"/>
                        <figcaption className="wgh-slider-item-figure__caption">
                          <a href="https://f4.bcbits.com/img/a3905613628_16.jpg">Ella</a>
                          <p>Quantic</p>
                        </figcaption>
                      </figure>
                      <label className="wgh-slider-item__trigger" htmlFor="slide-1" title="Show product 1"></label>
                    </div>
                  </div>
                  <div className="wgh-slider-item">
                    <div className="wgh-slider-item__inner">
                      <figure className="wgh-slider-item-figure">
                        <img className="wgh-slider-item-figure__image" src="https://rescuepawsthailand.org/wp-content/uploads/2024/08/Sod-Sai-2-1024x972.jpg" alt="The 5th Exotic"/>
                        <figcaption className="wgh-slider-item-figure__caption">
                          <a href="https://f4.bcbits.com/img/a3905613628_16.jpg">Sod Sai</a>
                          <p>Quantic</p>
                        </figcaption>
                      </figure>
                      <label className="wgh-slider-item__trigger" htmlFor="slide-2" title="Show product 2"></label>
                    </div>
                  </div>
                  <div className="wgh-slider-item">
                    <div className="wgh-slider-item__inner">
                      <figure className="wgh-slider-item-figure">
                        <img className="wgh-slider-item-figure__image" src="https://usercontent.one/wp/dogrescuethailand.com/wp-content/uploads/2023/02/str5-e1675759420935.jpeg?media=1660398864" alt="The 5th Exotic"/>
                        <figcaption className="wgh-slider-item-figure__caption">
                          <a href="https://f4.bcbits.com/img/a3905613628_16.jpg">Boolean</a>
                          <p>Quantic</p>
                        </figcaption>
                      </figure>
                      <label className="wgh-slider-item__trigger" htmlFor="slide-3" title="Show product 3"></label>
                    </div>
                  </div>
                  <div className="wgh-slider-item">
                    <div className="wgh-slider-item__inner">
                      <figure className="wgh-slider-item-figure">
                        <img className="wgh-slider-item-figure__image" src="https://rescuepawsthailand.org/wp-content/uploads/2023/11/Bambi3-e1700801399563-1024x1024.jpg" alt="The 5th Exotic"/>
                        <figcaption className="wgh-slider-item-figure__caption">
                          <a href="https://f4.bcbits.com/img/a3905613628_16.jpg">Bambi</a>
                          <p>Quantic</p>
                        </figcaption>
                      </figure>
                      <label className="wgh-slider-item__trigger" htmlFor="slide-4" title="Show product 4"></label>
                    </div>
                  </div>
                  <div className="wgh-slider-item">
                    <div className="wgh-slider-item__inner">
                      <figure className="wgh-slider-item-figure">
                        <img className="wgh-slider-item-figure__image" src="https://usercontent.one/wp/dogrescuethailand.com/wp-content/uploads/2022/12/de4-1536x2048.jpeg?media=1660398864" alt="RYSY - Traveler LP"/>
                        <figcaption className="wgh-slider-item-figure__caption">
                          <a href="https://picsum.photos/id/237/480/480">Kai</a>
                          <p>RYSY</p>
                        </figcaption>
                      </figure>
                      <label className="wgh-slider-item__trigger" htmlFor="slide-5" title="Show product 5"></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='flex m-auto '>
          <Button asChild className='w-[400px] h-[50px]' >
            <Link to="/adopt" className='text-xl'>Get to know the rest</Link>
          </Button>
          </div>

        </div>
        <span>Third</span>
      </section>

      <section id="section 4" ref={el => (sectionsRef.current[3] = el)}>
        <div className={`h-[500px] fade-in-image ${visibleSections[3] ? 'inview' : ''}`}>
          <div className='flex flex-col gap-10 justify-center items-center text-center'>
          <p className='text-[50px]'>Help Us Create Sustainable Change</p>
            <p className='text-3xl w-2/3  p-14 border-4'>Sustainable change is not just about sterilizing as many animals as we can. Educating local communities about animal welfare and the importance of sterilization is just as critical to fundamentally change the attitudes and behavior that affects stray lives. This is the root of the problem and our unique approach to solving it, which is made possible with your support.</p>

        </div>
        </div>
        <span>Fourth</span>
      </section>

        <section id="section 5" className=' w-full' ref={el => (sectionsRef.current[4] = el)}>
        <div className={`h-[600px] relative flex flex-col mx-auto fade-in-image ${visibleSections[3] ? 'inview' : ''}`}>
        {/* <img src="/src/assets/dogHome.jpg" className='h-full' alt="" />
        <Button className='absolute variant="link" bottom-10 bg-white z-20 text-black w-fit h-[60px] left-[220px] text-3xl '>ADOPT NOW</Button> */}
        {/* <Carousel className="w-full h-full">
        <CarouselContent className="-ml-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="bg-red-400 pl-1">
              <div className="p-1"> 
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel> */}
      </div>

      <span>Fifth</span>
        </section>
        

      <section id="section 6" ref={el => (sectionsRef.current[5] = el)}>
        <span>Fifth</span>
      </section>







    </div>
  );
};

export default Homepage;
