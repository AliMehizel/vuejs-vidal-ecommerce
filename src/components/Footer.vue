<template>
  <footer>
    <div class="footer-container">
      <div>
        <h4>SOCIAL LINKS</h4>
        <ul>
          <li><i class="fa-brands fa-instagram"></i> Instagram</li>
          <li><i class="fa-brands fa-facebook"></i> Facebook</li>
          <li><i class="fa-brands fa-linkedin"></i> Linkedin</li>
        </ul>
      </div>

      <div>
        <h4>CONTACT DETAILS</h4>
        <ul>
          <li><i class="fa-solid fa-table-layout"></i> vidal.com</li>
          <li><i class="fa-brands fa-google"></i> email@example.com</li>
          <li><i class="fa-solid fa-phone"></i>+52972222585</li>
        </ul>
      </div>

      <div>
        <h4>LINKS</h4>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
      
    </div>

    <div class="privacy">
      <p>&copy; 2023 vidal.com | <strong>coded by Ali Mehizel</strong></p>
    </div>
  </footer>
      
</template>

<script>
export default {

}
</script>

<style scoped>

footer{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: rgb(34, 69, 88);
  color: #fff;
}

.footer-container div{
  padding: 5px;
}

.footer-container{
  width: 100%;
  padding: 40px;
  display: grid;
  grid-template-columns: 200px 280px 200px;
  justify-content: center;
  place-items: center;
  gap: 50px;
}



li{
  list-style: none;
}

li i{
  margin: 5px;
}

.privacy{
  padding: 5px;
}
.privacy p,strong{
  color: #fff;
}

@media screen and (max-width:956px) {

.footer-container{

  grid-template-columns: repeat(3,240px);

}

.footer-container div{

  width: 100%;
}

}


@media screen and (max-width:956px) {

.footer-container{
  gap: 7px;
  grid-template-columns: repeat(1,240px);
}

}

</style>