import React from 'react';

import { GetServerSideProps } from 'next';
import Image from 'next/image';

import appPreviewImage from '../assets/app-nlw-copa-preview.png';
import logoImg from '../assets/logo.svg';
import usersAvatarExampleImg from '../assets/users-avatar-example.png';
import iconCheckedImage from '../assets/icon-check.svg';

interface IHomeProps {
  count: number;
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const { count } = await (await fetch('http://localhost:3333/pools/count')).json();

  return { props: { count } };
};

const Home: React.FC<IHomeProps> = ({ count }) => {
  return (
   <div className='max-w-[1124px] mx-auto grid grid-cols-2 gap-28 items-center h-screen'>
      <main>
        <Image src={logoImg} alt="NLW Copa"/>

        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image src={usersAvatarExampleImg} alt=""/>

            <strong className='text-gray-100 text-xl'>
              <span className='text-ignite-500'>+12.592</span> pessoas já estão usando
            </strong>
        </div>
  
        <form className='mt-10 flex gap-2'>
          <input
            required
            type="text"
            placeholder='Qual o nome do seu bolão'
            className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm'
          />
    
          <button
            type='submit'
            className='bg-yellow-500 px-6 py-4 rounded text-gray-900 text-sm font-bold uppercase hover:bg-yellow-700'
          >
            criar meu bolão
          </button>
        </form>
  
        <p className='mt-4 text-gray-300 text-sm leading-relaxed'>
          após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
        </p>

        <div className='mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100'>
          <div className='flex items-center gap-6'>
            <Image src={iconCheckedImage} alt=""/>

            <div className='flex flex-col '>
              <span className='font-bold text-2xl'>+2.034</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className='w-px h-14 bg-gray-600' />

          <div className='flex items-center gap-6'>
            <Image src={iconCheckedImage} alt=""/>

            <div className='flex flex-col '>
              <span className='font-bold text-2xl'>+192.847</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImage}
        alt="Celulares mostrando o app do bolão em sua versão mobile."
        quality={100}
      />
   </div>
  );
};

export default Home;
