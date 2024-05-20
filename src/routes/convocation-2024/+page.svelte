<script lang="ts">
  import ConvoHeroBottom from '$images/ConvoHeroBottom.jpg';
  import ConvoHeroTop from '$images/ConvoHeroTop.jpg';
</script>

<span id="convocation-2024" style="display: none; visibility: hidden;" />

<main class="ConvoHome">
  <h1 class="ConvoHome__hero">
    <img src={ConvoHeroTop} alt="Convocation 2024" />
    CONVOCATION 2024
    <img src={ConvoHeroBottom} alt="Convocation 2024" />
  </h1>
</main>

<style lang="scss">
  .ConvoHome {
    @include box();
    @include make-flex($just: flex-start);

    &__hero {
      @include box();
      @include make-flex();
      font-family: 'Eczar', serif;
      font-weight: 400;
      line-height: 100px;
      letter-spacing: 10px;
      font-size: 80px;
      text-align: center;
      margin-top: 10px;
      transition:
        font-size 0.3s,
        line-height 0.3s,
        letter-spacing 0.3s,
        margin-top 0.3s;

      @include respondAt(930px) {
        font-size: 60px;
        line-height: 80px;
      }
      // 750
      @include respondAt(750px) {
        font-size: 50px;
        line-height: 70px;
      }
      // 660
      @include respondAt(660px) {
        font-size: 40px;
        line-height: 60px;
      }
      // 500
      @include respondAt(500px) {
        font-size: 30px;
        line-height: 50px;
      }
      // 400
      @include respondAt(400px) {
        font-size: 25px;
        line-height: 40px;
      }
      img {
        @include box(90%, auto);
        @include respondAt(470px) {
          width: 100%;
        }
      }
    }
  }
</style>
