import React from 'react'

const movies = [
    {
        id: 1,
        title: 'Squid Game',
        poster: 'https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQUqyGgWU0wHMJthDrCl3skF0vJqtxuhPbF5HSNPvVrhF_-Bwjo_64TLKIb3133t9QAy687VRSf_JKFq2KTf1fIuX_FjQCmxHScY6pbNCKe0DhAa_2qOpN1x52xn94_1gW6jh4lGe7mDWDoc-HwzOjjh3qik.jpg?r=b73'
    },

    {
        id: 2,
        title: 'Game of  Thrones',
        poster: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p8553063_b_v13_ax.jpg'
    },

    {
        id: 3,
        title: 'Wedness Day',
        poster:'https://lakewoodsnn.com/wp-content/uploads/2023/02/wednesday-720x900.jpg',
    },

    {
        id: 4,
        title: 'Transformer ',
        poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/Transformers_Age_of_Extinction_poster.jpg/250px-Transformers_Age_of_Extinction_poster.jpg'
    },

    {
        id: 5,
        title: 'Soccer',
        poster: 'https://miro.medium.com/v2/resize:fit:401/0*xULePD_9HpwSBRTU.jpg'
    },

    {
        id: 6,
        title: 'The Big Green',
        poster: 'https://512.soccer/wp-content/uploads/2019/10/The-Big-Green-278x400.jpg'
    }
];

function Education() {
    return (
      <>
      
        <div className='p-4 grid grid-cols-4  gap-4'>
          {movies.map(movie => (
            <div
              key={movie.id}
              className='bg-amber-400 w-full flex flex-col pb-6 items-center justify-center rounded-2xl'
            >
              <img
                src={movie.poster}
                alt="poster"
                className='h-80 w-full rounded-t-2xl'
              />
              <p className='text-center mt-6'>{movie.title}</p>
            </div>
          ))}
        </div>
      </>
    );
  }
  

export default Education
