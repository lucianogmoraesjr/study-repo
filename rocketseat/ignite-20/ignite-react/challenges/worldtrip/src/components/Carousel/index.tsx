import { Box } from '@chakra-ui/react'
import { Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { CarouselItem } from './CarouselItem'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export function Carousel() {
  return (
    <Box maxW="1240px" h={['250px', '450px']} mt={['5', '14']} mx="auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        className="swiper-container"
      >
        <SwiperSlide className="swiper-item">
          <CarouselItem
            imageUrl="https://images.unsplash.com/photo-1519677100203-a0e668c92439"
            name="Europa"
            caption="O continente mais antigo."
            path="/europe"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-item">
          <CarouselItem
            imageUrl="https://images.unsplash.com/photo-1619546952812-520e98064a52"
            name="América do Sul"
            caption="Lar da maior floresta tropical do mundo."
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-item">
          <CarouselItem
            imageUrl="https://images.unsplash.com/photo-1546083381-2bed38b42cac"
            name="América do Norte"
            caption="O terceiro maior continente do mundo."
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-item">
          <CarouselItem
            imageUrl="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5"
            name="África"
            caption="História e resistência no coração africano."
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-item">
          <CarouselItem
            imageUrl="https://images.unsplash.com/photo-1589330273594-fade1ee91647"
            name="Oceania"
            caption="Ilhas paradisíacas e paisagens maravilhosas"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-item">
          <CarouselItem
            imageUrl="https://images.unsplash.com/photo-1464817739973-0128fe77aaa1"
            name="Ásia"
            caption="Lar das civilizações mais antigas e avançadas do mundo."
          />
        </SwiperSlide>
      </Swiper>
    </Box>
  )
}
