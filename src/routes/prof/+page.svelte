<script>
  import ProfCard from "$components/ProfCard/ProfCard.svelte";
  import prof from "$data/prof.json";
</script>

<div class="Prof__header">
  <div class="Prof__header--top">
    <h2>Where's My Prof?</h2>
    <p>
      Locate your professors on campus hassle-free. Say goodbye to wandering
      through hallways or frantically searching for room numbers.
    </p>
  </div>
  <div class="Prof__header--bottom" />
</div>

<div class="Prof__content">
  {#each prof as { name, role, room, block, website, school, department, img }}
    <ProfCard
      {name}
      {role}
      {room}
      {block}
      {website}
      {school}
      {department}
      {img}
    />
  {/each}
  <!-- <ProfCard
    name="Sumit Tiwari"
    role="Assistant Professor"
    room="C212G"
    block="C"
    website=""
    school="SCHOOL OF ENGINEERING"
    department="DEPARTMENT OF MECHANICAL ENGINEERING"
    img=""
  /> -->
</div>

<style lang="scss" src="../../styles/routes/prof.scss"></style>
