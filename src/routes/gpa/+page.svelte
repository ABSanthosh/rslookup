<script lang="ts">
  import { GPAStore } from '$stores/GPAStore';

  const SYMBOLS: {
    [key: string]: string;
  } = {
    I: 'Incomplete',
    R: 'Result Withheld',
    W: 'Withdraw from Course',
    Z: 'Course continuation',
    AP: 'Audit Pass',
    AF: 'Audit Fail',
    P: 'Pass',
    NP: 'Not Pass',
    AU: 'Audit Successfully Completed',
    S: 'Satisfactory Completion',
    U: 'Unsatisfactory',
    TR: 'Transfer Credit',
    RE: 'Replacing/Substituting this course with a new course.',
    CL: 'Clearing a previously failed course.',
    IM: 'Improving a previously done course.'
  } as const;

  const GRADES: {
    [key: string]: number;
  } = {
    S: 0,
    U: 0,
    A: 10,
    'A*': 9.5,
    'A-': 9,
    'A-*': 8.5,
    B: 8,
    'B*': 7.5,
    'B-': 7,
    'B-*': 6.5,
    C: 6,
    'C*': 5.5,
    'C-': 5,
    'C-*': 4.5,
    D: 4,
    'D*': 3.5,
    E: 2,
    F: 0,
    'F*': 0
  } as const;

  $: currentCGPA = 0;
  $: creditsDone = 0;
  $: cumulative = 0.0;
  // $: semesters = $GPAStore;

  $: $GPAStore.map((item) => item.courses), $GPAStore.forEach((_, i) => calcSGPA(i));

  const calcSGPA = (index: number) => {
    // if any course has no credits, set SGPA to 0
    if ($GPAStore[index].courses.some((course) => !course.credits)) {
      $GPAStore[index].SGPA = 0;
      return;
    }

    // sgpa = sum(credits * grade) / sum(credits)
    const semester = $GPAStore[index];
    const { courses } = semester;
    const totalCredits = courses.reduce((acc, curr) => {
      if (curr.grade === 'S' || curr.grade === 'U') return 0;
      return acc + curr.credits;
    }, 0);
    const totalGrade = courses.reduce((acc, curr) => {
      if (curr.grade === 'S' || curr.grade === 'U') return 0;
      return acc + curr.credits * GRADES[curr.grade];
    }, 0);
    $GPAStore[index].SGPA = Math.round((totalGrade / totalCredits) * 100) / 100;

    // calculate CGPA
    // cgpa = (currentCGPA * creditsDone) + sum((sgpa * semester credits)) / sum(semester credits) + creditsDone
    cumulative = parseFloat(
      (
        (currentCGPA * creditsDone +
          $GPAStore.reduce(
            (acc, curr) =>
              acc +
              curr.SGPA *
                curr.courses.reduce((a, c) => {
                  if (c.grade === 'S' || c.grade === 'U') return 0;
                  return a + c.credits;
                }, 0),
            0
          )) /
        (creditsDone +
          $GPAStore.reduce(
            (acc, curr) =>
              acc +
              curr.courses.reduce((a, c) => {
                if (c.grade === 'S' || c.grade === 'U') return 0;
                return a + c.credits;
              }, 0),
            0
          ))
      ).toFixed(2)
    );
  };
</script>

<svelte:head>
  <title>GPA Calculator</title>
  <meta name="description" content="Estimate your academic growth with ease." />
</svelte:head>

<div class="GPA__header w-100">
  <h2>GPA Calculator</h2>
  <p>Estimate your academic growth with ease.</p>
</div>

<main class="GPA__info w-100">
  <h2>Credit System</h2>
  <p>
    Each Course offered will carry credits which are calculated on the basis of the number of
    contact hours per week for a course that runs the whole semester. The listing of the credits
    will be given as L:T:P, where L is the number of Lecture Classes, T is the number of Tutorial
    Classes; and P is the number of Lab Sessions. A typical Lab Session is usually between 2 and 3
    hours' duration.
    <br />
    <br />
    For example, a course with 3:1:1 credits is a 5 credit course where the student shall attend 3 lectures,
    1 tutorial and 1 lab session every week for the whole semester.
    <br />
    <br />

    <a
      class="FancyLink"
      data-type="Bracket"
      href="https://snulinks.snu.edu.in/snuPolicies/students/UNDERGRADUATE_HANDBOOK_2023-2024.pdf#page=4"
      target="_blank"
      rel="noopener noreferrer"
    >
      Ref: UG Handbook - pg. 4
    </a>
  </p>
  <em>
    Note: There are some issues with courses with S/U grade courses. This is being worked on.
  </em>
</main>

<main class="GPA__bottom w-100">
  <aside class="GPA__result w-100">
    <h3>Your GPA</h3>
    <div class="GPA__result--item">
      <h4>Cumulative</h4>
      <h4>{cumulative}</h4>
    </div>
    {#each $GPAStore as item, i}
      <div class="GPA__result--item">
        <p>{item.title || `Semester ${i + 1}`}</p>
        <p>{item.SGPA}</p>
      </div>
    {/each}
    <hr />
    <div class="GPA__result--item">
      <p>Current CGPA</p>
      <input
        class="CrispInput"
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
        class="CrispInput"
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
    {#each $GPAStore as sem, index}
      <section class="GPA__semester">
        <div class="GPA__semester--top Row--between">
          <input
            class="CrispInput"
            type="text"
            placeholder="Semester Name"
            bind:value={$GPAStore[index].title}
          />
          {#if $GPAStore.length > 1}
            <button
              class="CrispButton"
              data-icon={String.fromCharCode(58829)}
              data-type="danger"
              on:click={() => {
                $GPAStore = $GPAStore.filter((_, i) => i !== index);
              }}
            />
          {/if}
        </div>
        <table>
          <thead>
            <tr>
              <th scope="col">Course</th>
              <th scope="col">Credits</th>
              <th scope="col">Grade</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {#each sem.courses as course, i}
              <tr style="border-bottom: 1px solid var(--t-crp-border); padding-bottom: 10px">
                <td data-label="Course">
                  <input
                    class="CrispInput"
                    type="text"
                    placeholder={`Course ${i + 1}`}
                    bind:value={course.name}
                  />
                </td>
                <td data-label="Credits">
                  <input
                    class="CrispInput"
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
                <td data-label="Grade">
                  <select
                    class="CrispSelect"
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
                    class="CrispButton"
                    disabled={$GPAStore[index].courses.length === 1}
                    data-icon={String.fromCharCode(58829)}
                    data-type="danger"
                    on:click={() => {
                      $GPAStore[index].courses = $GPAStore[index].courses.filter((_, j) => j !== i);
                    }}
                  />
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
        <button
          class="CrispButton"
          data-type="success"
          on:click={() => {
            $GPAStore[index].courses = [
              ...$GPAStore[index].courses,
              {
                name: '',
                credits: 1,
                grade: 'A'
              }
            ];
          }}
        >
          Add Course
        </button>
      </section>
    {/each}
    <button
      class="CrispButton"
      disabled={$GPAStore.length >= 10}
      on:click={() => {
        if ($GPAStore.length >= 10) return;
        $GPAStore = [
          ...$GPAStore,
          {
            title: $GPAStore.length ? `Semester ${$GPAStore.length + 1}` : 'Semester 1',
            SGPA: 0,
            courses: [
              {
                name: '',
                credits: 0,
                grade: 'A'
              }
            ]
          }
        ];
      }}
    >
      Add Semester
    </button>
  </div>
</main>

<main class="GPA__info w-100">
  <div class="GPA__info--wrapper">
    <details>
      <summary>Credits that contribute to CGPA</summary>
      <table class="CrispTable" data-no-footer>
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
      <table class="CrispTable" data-no-footer>
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
    * Indicates that the student was short in attendance in the course resulting in 0.5 grade point
    deduction from the actual grade point.
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
        color: var(--subFg-1);
      }
    }

    &__bottom {
      gap: 24px;
      min-height: 50vh;
      @include make-flex($dir: row, $align: flex-start, $just: flex-start);

      @include respondAt(700px) {
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
      background-color: var(--elevation-1);
      border: 1px solid var(--lab-item-separator);
      @include make-flex($dir: column, $align: flex-start);

      @include respondAt(700px) {
        width: 100%;
        position: relative;
        top: 0;
      }

      & > hr {
        background: var(--lab-item-separator);
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
      border: 1px solid var(--t-crp-border);
      &--top {
        @include box($height: auto);

        & > input {
          width: auto;
          border-radius: 4px;
          background-color: var(--elevation-1);
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

              & > input,
              & > button,
              & > select {
                height: 30px;
              }

              & > input {
                border-radius: 5px;
                border: 1px solid var(--t-crp-border);
              }
            }
          }
        }
      }

      @include respondAt(350px) {
        & > table {
          & > tbody {
            & > tr {
              & > td {
                height: auto;
                grid-template-columns: 1fr;
                grid-template-rows: auto 1fr;

                &::before {
                  height: 20px;
                }
              }
            }
          }
        }
      }

      @include respondAt(700px) {
        width: 100%;
        & > table {
          width: 100%;

          & > tbody {
            gap: 10px;
            @include make-flex();
          }
          & > thead {
            width: 1px;
            padding: 0;
            height: 1px;
            border: none;
            margin: -1px;
            overflow: hidden;
            position: absolute;
            clip: rect(0 0 0 0);
          }

          & tr {
            gap: 10px;
            width: 100%;
            @include make-flex();
          }

          & td {
            gap: 10px;
            display: grid;
            grid-template-columns: 100px 1fr;

            & > button {
              width: 50px;
            }

            &::before {
              width: 100%;
              text-align: left;
              font-weight: bold;
              content: attr(data-label);
            }

            &:last-child {
              border-bottom: 0;
            }
          }
        }
      }
    }

    &__info {
      gap: 14px;
      // margin-top: 45px;
      @include make-flex($align: flex-start);

      & > p {
        font-size: 18px;
        text-align: justify;
        line-height: 1.6;
      }

      &--wrapper {
        gap: 10px;
        display: grid;
        // @include box();
        width: 100%;

        // grid-template-columns: 1fr 1fr;

        grid-template-columns: 1fr;
        @include respondAt(666px) {
        }

        & > details {
          @include box($height: auto);
          padding: 10px;
          border-radius: 10px;
          @include make-flex();
          border: 1px solid var(--t-crp-border);
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
