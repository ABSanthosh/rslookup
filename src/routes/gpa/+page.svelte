<script lang="ts">
  const GRADES: {
    [key: string]: number;
  } = {
    A: 10,
    "A*": 9.5,
    "A-": 9,
    "A-*": 8.5,
    B: 8,
    "B*": 7.5,
    "B-": 7,
    "B-*": 6.5,
    C: 6,
    "C*": 5.5,
    "C-": 5,
    "C-*": 4.5,
    D: 4,
    "D*": 3.5,
    E: 2,
    F: 0,
    "F*": 0,
  } as const;

  $: currentCGPA = 0;
  $: creditsDone = 0;
  $: cumulative = 0.0;
  $: semesters = [
    {
      title: "Semester 1",
      SGPA: 0,
      courses: [
        {
          name: "Course 1",
          credits: 0,
          grade: "A",
        },
      ],
    },
  ];

  $: semesters.map((item) => item.courses),
    semesters.forEach((_, i) => calcSGPA(i));

  const calcSGPA = (index: number) => {
    // if any course has no credits, set SGPA to 0
    if (semesters[index].courses.some((course) => !course.credits)) {
      semesters[index].SGPA = 0;
      return;
    }

    // sgpa = sum(credits * grade) / sum(credits)
    const semester = semesters[index];
    const { courses } = semester;
    const totalCredits = courses.reduce((acc, curr) => acc + curr.credits, 0);
    const totalGrade = courses.reduce(
      (acc, curr) => acc + curr.credits * GRADES[curr.grade],
      0
    );
    semesters[index].SGPA = Math.round((totalGrade / totalCredits) * 100) / 100;

    // calculate CGPA
    // cgpa = (currentCGPA * creditsDone) + sum((sgpa * semester credits)) / sum(semester credits) + creditsDone
    cumulative = parseFloat(
      (
        (currentCGPA * creditsDone +
          semesters.reduce(
            (acc, curr) =>
              acc + curr.SGPA * curr.courses.reduce((a, c) => a + c.credits, 0),
            0
          )) /
        (creditsDone +
          semesters.reduce(
            (acc, curr) =>
              acc + curr.courses.reduce((a, c) => a + c.credits, 0),
            0
          ))
      ).toFixed(2)
    );
  };
</script>

<div class="GPA__header w-100">
  <h2>GPA Calculator</h2>
  <p>Estimate your academic growth with ease.</p>
</div>

<main class="GPA__bottom w-100">
  <aside class="GPA__result w-100">
    <h3>Your GPA</h3>
    <div class="GPA__result--item">
      <h4>Cumulative</h4>
      <h4>{cumulative}</h4>
    </div>
    {#each semesters as item, i}
      <div class="GPA__result--item">
        <p>{item.title || `Semester ${i + 1}`}</p>
        <p>{item.SGPA}</p>
      </div>
    {/each}
    <hr />
    <div class="GPA__result--item">
      <p>Current CGPA</p>
      <input
        class="FancyInput"
        type="number"
        step="0.01"
        on:focus={({ target }) => {
          // @ts-ignore
          target.select();
        }}
        bind:value={currentCGPA}
      />
    </div>
    <div class="GPA__result--item">
      <p>Credits done</p>
      <input
        class="FancyInput"
        type="number"
        on:focus={({ target }) => {
          // @ts-ignore
          target.select();
        }}
        bind:value={creditsDone}
      />
    </div>
  </aside>
  <div class="GPA__content w-100">
    {#each semesters as sem, index}
      <section class="GPA__semester">
        <div class="GPA__semester--top Row--between">
          <input
            class="FancyInput"
            type="text"
            placeholder="Semester Name"
            bind:value={semesters[index].title}
          />
          {#if semesters.length > 1}
            <button
              class="FancyButton"
              data-icon={String.fromCharCode(58829)}
              data-close
              on:click={() => {
                semesters = semesters.filter((_, i) => i !== index);
              }}
            />
          {/if}
        </div>
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Credits</th>
              <th>Grade</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {#each sem.courses as course, i}
              <tr>
                <td>
                  <input
                    class="FancyInput"
                    type="text"
                    placeholder={`Course ${i + 1}`}
                    bind:value={course.name}
                  />
                </td>
                <td>
                  <input
                    class="FancyInput"
                    type="number"
                    placeholder="Credits"
                    on:focus={({ target }) => {
                      // @ts-ignore
                      target.select();
                    }}
                    on:change={() => calcSGPA(index)}
                    bind:value={course.credits}
                  />
                </td>
                <td>
                  <select
                    class="FancySelect"
                    bind:value={course.grade}
                    on:change={() => calcSGPA(index)}
                  >
                    {#each Object.keys(GRADES) as grade}
                      <option value={grade}>{grade}</option>
                    {/each}
                  </select>
                </td>
                <td>
                  <button
                    class="FancyButton"
                    disabled={semesters[index].courses.length === 1}
                    data-icon={String.fromCharCode(58829)}
                    data-close
                    on:click={() => {
                      console.log(i);
                      semesters[index].courses = semesters[
                        index
                      ].courses.filter((_, j) => j !== i);
                    }}
                  />
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
        <button
          class="FancyButton"
          on:click={() => {
            semesters[index].courses = [
              ...semesters[index].courses,
              {
                name: "",
                credits: 0,
                grade: "A",
              },
            ];
          }}
        >
          Add Course
        </button>
      </section>
    {/each}
    <button
      class="FancyButton"
      disabled={semesters.length >= 10}
      on:click={() => {
        if (semesters.length >= 10) return;
        semesters = [
          ...semesters,
          {
            title: semesters.length
              ? `Semester ${semesters.length + 1}`
              : "Semester 1",
            SGPA: 0,
            courses: [
              {
                name: "",
                credits: 0,
                grade: "A",
              },
            ],
          },
        ];
      }}
    >
      Add Semester
    </button>
  </div>
</main>

<style lang="scss" src="../../styles/routes/gpa.scss"></style>
