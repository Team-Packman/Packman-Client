import { ReactNode, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styled from 'styled-components';
import SwiperCore, { Virtual, Navigation, Pagination } from 'swiper';
import { packmanColors } from '../styles/color';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

SwiperCore.use([Virtual, Navigation, Pagination]);

interface SwiperProps {
  key?: string;
  isRecentListExist: boolean;
  getSwiperIndex(index: number): void;
  children: ReactNode[];
}

function SwiperContainer(props: SwiperProps) {
  const { children, isRecentListExist, getSwiperIndex } = props;

  const [swiperRef, setSwiperRef] = useState<SwiperCore>(); /* eslint-disable no-unused-vars */
  const [bullet] = useState<string[]>(['함께 패킹', '혼자 패킹']);
  const [slides] = useState(Array.from({ length: 2 }).map((_, idx) => <div key={idx}></div>));

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<div class="' + className + '" key="' + index + '">' + bullet[index] + '</div>';
    },
  };

  return (
    <StyledRoot isRecentListExist={isRecentListExist}>
      <StyledSwiper
        onSwiper={setSwiperRef}
        modules={[Pagination]}
        pagination={pagination}
        onSlideChange={(s) => getSwiperIndex(s.activeIndex)}
        virtual
      >
        {slides.map((slideContent, index) => (
          <SwiperSlide key={slideContent.key} virtualIndex={index}>
            {children[index]}
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </StyledRoot>
  );
}

export default SwiperContainer;

export const StyledRoot = styled.div<{ isRecentListExist: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 4rem);
  height: calc(var(--vh, 1vh) * 100 - 20.5rem);
  overflow-y: auto;
  margin-top: ${({ isRecentListExist }) => (isRecentListExist ? '0' : '4.2rem')};
`;

export const StyledSwiper = styled(Swiper)`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 4.8rem;

  .swiper-pagination {
    display: flex;
    top: 0;
    height: 4rem;
    width: 100%;
    border: 1px solid ${packmanColors.pmDeepGrey};
    border-radius: 0.6rem;
    background: ${packmanColors.pmWhite};
  }

  .swiper-pagination-bullet {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 0.6rem;
    color: ${packmanColors.pmDeepGrey};
    font-size: 16px;
    background: ${packmanColors.pmWhite};
  }
  .swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet,
  .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 0 !important;
  }

  .swiper-pagination-bullet-active {
    color: ${packmanColors.pmWhite};
    background: ${packmanColors.pmBlack};
  }
  .swiper-slide {
    display: flex;
    flex-direction: column;
    justify-content: center;

    align-items: center;
    overflow-y: auto; /* 브라우저별 스크롤바 숨김 설정 */
    -ms-overflow-style: none; // Edge
    scrollbar-width: none; // Firefox
    &::-webkit-scrollbar {
      display: none; // Chrome, Safari, Opera
    }
  }
`;

export const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100% - 3rem);
  height: 4.5rem;
  margin-bottom: 2.4rem;
`;

export const StyledButton = styled.button`
  border: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
`;
