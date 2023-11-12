<script lang="ts">
  const GRADES = [
    {
      grade: "A",
      points: 10,
    },
    {
      grade: "A-",
      points: 9,
    },
    {
      grade: "B",
      points: 8,
    },
    {
      grade: "B-",
      points: 7,
    },
    {
      grade: "C",
      points: 6,
    },
    {
      grade: "C-",
      points: 5,
    },
    {
      grade: "D",
      points: 4,
    },
    {
      grade: "E",
      points: 2,
    },
    {
      grade: "F",
      points: 0,
    },
    {
      grade: "F*",
      points: 0,
    },
  ] as const;

  $: currentGPA = 0;
  const semesters = [
    {
      title: "Semester 1",
      SGPA: 0,
      courses: [
        {
          name: "Course 1",
          credits: 4,
          grade: "A",
        },
        {
          name: "Course 2",
          credits: 4,
          grade: "A",
        },
        {
          name: "Course 3",
          credits: 4,
          grade: "A",
        },
      ],
    },
  ];
</script>

<div class="GPA__header w-100">
  <h2>GPA Calculator</h2>
  <p>Estimate your academic growth with ease.</p>
</div>

<main class="GPA__bottom w-100">
  <aside class="GPA__result w-100">
    <h3>Your GPA</h3>
    <div class="GPA__result--item">
      <span>Cumulative</span>
      <span>0.00</span>
    </div>
    {#each semesters as item}
      <div class="GPA__result--item">
        <span>{item.title}</span>
        <span>{item.SGPA}</span>
      </div>
    {/each}
    <hr />
    <div class="GPA__result--item">
      <span>Current</span>
      <input
        class="FancyInput"
        type="number"
        step="0.01"
        on:focus={({ target }) => {
          // @ts-ignore
          target.select();
        }}
        bind:value={currentGPA}
      />
    </div>
  </aside>
  <div class="GPA__content w-100">content</div>
</main>

<style lang="scss" src="../../styles/routes/gpa.scss"></style>
