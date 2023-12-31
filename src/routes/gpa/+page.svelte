<script lang="ts">
  const SYMBOLS: {
    [key: string]: string;
  } = {
    I: "Incomplete",
    R: "Result Withheld",
    W: "Withdraw from Course",
    Z: "Course continuation",
    AP: "Audit Pass",
    AF: "Audit Fail",
    P: "Pass",
    NP: "Not Pass",
    AU: "Audit Successfully Completed",
    S: "Satisfactory Completion",
    U: "Unsatisfactory",
    TR: "Transfer Credit",
    RE: "Replacing/Substituting this course with a new course.",
    CL: "Clearing a previously failed course.",
    IM: "Improving a previously done course.",
  } as const;

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

<main class="GPA__info w-100">
  <h2>Credit System</h2>
  <p>
    Each Course offered will carry credits which are calculated on the basis of
    the number of contact hours per week for a course that runs the whole
    semester. The listing of the credits will be given as L:T:P, where L is the
    number of Lecture Classes, T is the number of Tutorial Classes; and P is the
    number of Lab Sessions. A typical Lab Session is usually between 2 and 3
    hours' duration.
    <br />
    <br />
    For example, a course with 3:1:1 credits is a 5 credit course where the student
    shall attend 3 lectures, 1 tutorial and 1 lab session every week for the whole
    semester.
    <br />
    <br />

    <a
      class="FancyLink"
      data-type="Bracket"
      href="https://snulinks.snu.edu.in/snuPolicies/students/UNDERGRADUATE_HANDBOOK_2023-2024.pdf"
      target="_blank"
      rel="noopener noreferrer"
    >
      Ref: UG Handbook - pg. 4
    </a>
  </p>

  <div class="GPA__info--wrapper">
    <details open>
      <summary>Credits that contribute to CGPA</summary>
      <table class="GPA__info--table">
        <thead>
          <tr>
            <th>Grade</th>
            <th>Credit Points</th>
          </tr>
        </thead>
        <tbody>
          {#each Object.keys(GRADES) as grade}
            <tr>
              <td>{grade}</td>
              <td>{GRADES[grade]}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </details>

    <details>
      <summary>Credits that do not contribute to CGPA</summary>
      <table class="GPA__info--table">
        <thead>
          <tr>
            <th>Grade</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {#each Object.keys(SYMBOLS) as grade}
            <tr>
              <td>{grade}</td>
              <td>{SYMBOLS[grade]}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </details>
  </div>
  <p>
    * Indicates that the student was short in attendance in the course resulting
    in 0.5 grade point deduction from the actual grade point.
  </p>
</main>

<style lang="scss">
  .GPA {
    &__header {
      @include make-flex($align: flex-start);
      margin: 40px 0 30px 0;
      gap: 10px;

      & > h2 {
        font-size: 40px;
        font-weight: 900;
        color: var(--foreground);
      }

      & > p {
        font-size: 20px;
        font-weight: 400;
        color: var(--subText);
      }
    }

    &__bottom {
      gap: 24px;
      min-height: 50vh;
      @include make-flex($dir: row, $align: flex-start, $just: flex-start);

      @include respondAt(630px) {
        flex-direction: column;
      }
    }

    &__result {
      top: 108px;
      width: 230px;
      height: unset;
      flex-shrink: 0;
      overflow: auto;
      position: sticky;
      max-height: calc(100vh - 124px);

      gap: 10px;
      padding: 10px;
      border-radius: 10px;
      background-color: var(--elevatedBG);
      border: 1px solid var(--LabSeparator);
      @include make-flex($dir: column, $align: flex-start);

      @include respondAt(630px) {
        width: 100%;
        position: relative;
        top: 0;
      }

      & > hr {
        background: var(--LabSeparator);
        @include box(100%, 1px);
        border: none;
      }

      &:first-child {
        h4 {
          color: var(--bluePrimary);
          font-weight: 500;
        }
      }
      &--item {
        @include make-flex($dir: row, $just: space-between);
        @include box($height: 30px);

        & > input {
          @include box(50px);
          text-align: end;
        }
      }
    }

    &__content {
      @include box();
      @include make-flex($dir: column, $align: flex-start);
      gap: 20px;
    }

    &__semester {
      gap: 10px;
      padding: 10px;
      border-radius: 10px;
      @include make-flex($align: flex-start);
      border: 1px solid var(--border);
      box-shadow: var(--SectionShadow);
      &--top {
        @include box($height: 35px);

        & > input {
          @include box(auto);
          border-radius: 4px;
          background-color: var(--elevatedBG);
        }
      }

      & > table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 10px;

        & > thead {
          & > tr {
            & > th {
              @include box($height: 30px);
              text-align: start;
            }
          }
        }

        & > tbody {
          & > tr {
            & > td {
              @include box($height: 30px);
              text-align: center;

              & > input {
                @include box(100%, 35px);
                border-radius: 5px;
                border: 1px solid var(--border);
              }
            }
          }
        }
      }
    }

    &__info {
      gap: 14px;
      margin-top: 45px;
      @include make-flex($align: flex-start);

      & > p {
        font-size: 18px;
        text-align: justify;
        line-height: 1.6;
      }

      &--table {
        --__borderRadius: 6px;
        --__headerBorderRadius: var(--__borderRadius) var(--__borderRadius) 0 0;

        border-collapse: collapse;
        border-radius: var(--__headerBorderRadius);

        overflow: unset;
        list-style: none;
        @include box($height: auto);
        border: 1px solid var(--border);
        border-radius: var(--__borderRadius);

        th,
        td {
          padding: 0 15px;
          font-size: 14px;
          font-weight: 400;
          text-align: left;
          @include box(auto, $height: 40px);
          border-top: 1px solid var(--border);
        }

        thead {
          background-color: var(--tableHeaderBG);
          color: var(--tableHeaderBG);
          text-align: left;
          & > tr th {
            font-weight: bold;
          }
        }

        tbody tr:nth-of-type(even) {
          background-color: var(--LabHover);
        }

        tbody tr:last-of-type {
          border-bottom: 1px solid var(--border);
        }
      }

      &--wrapper {
        gap: 10px;
        display: grid;
        @include box();

        // grid-template-columns: 1fr 1fr;

        grid-template-columns: 1fr;
        @include respondAt(666px) {
        }

        & > details {
          @include box();
          padding: 10px;
          border-radius: 10px;
          @include make-flex();
          border: 1px solid var(--border);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

          & > summary {
            cursor: pointer;
            @include box($height: auto);
          }

          & > table {
            margin-top: 15px;
          }
        }
      }
    }
  }
</style>
