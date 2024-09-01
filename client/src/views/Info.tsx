import React from 'react'
import globalStyles from '../styles/app.module.css'
import styled from 'styled-components'
const Info = () => {
  return (
    <div className={globalStyles.views}>
        <InfoWrapper>
        <h2>Info</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit totam eius saepe! Dolores magni, tempora est reiciendis atque similique repellendus aliquam voluptatem nihil. Eum pariatur exercitationem molestias iure quasi aut.
            Beatae molestias consectetur quasi autem placeat tempora dolores nulla sed! Assumenda sit at explicabo itaque esse consequatur! Minima veniam provident eum, at incidunt dolor facere doloremque! Alias quia doloremque odio.
            Debitis maiores illum impedit, nesciunt aut dolor quisquam soluta libero quam nemo facilis! Fugiat, nostrum, iste in quasi molestiae reiciendis doloremque amet ipsa deleniti officia inventore impedit deserunt incidunt debitis!
            </p>
        </InfoWrapper>
    </div>
  )
}

const InfoWrapper = styled.div`
    margin: var(--app-margin);
  border-radius: var(--app-border-radius);
  height: 98%;
  background-color: var(--background-color);
  padding: var(--app-padding);
  text-align: center;
  >h2{
    margin: 20px 0;
  }
  p{
    text-align: left;
  }
`;

export default Info