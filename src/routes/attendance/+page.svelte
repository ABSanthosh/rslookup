<script lang="ts">
  import { AttendanceStore } from '$stores/AttendanceStore';
  import AttendanceCreditHours from '$images/AttendanceCreditHours.png';

  const calcPercentage = (index: number) => {
    const { lec, tut, pra } = $AttendanceStore[index];
    // sum(lec.attended, tut.attended, pra.attended) / sum(lec.total, tut.total, pra.total)
    const percentage = (
      ((lec.attended + tut.attended + pra.attended) / (lec.total + tut.total + pra.total)) *
      100
    ).toFixed(2);

    if (isNaN(parseFloat(percentage)) || !isFinite(parseFloat(percentage))) return '0.00';
    return percentage;
  };

  const attendAll = (index: number) => {
    // sum(lec.attended, tut.attended, pra.attended, lec.pending, tut.pending, pra.pending) /
    // sum(lec.total, tut.total, pra.total, lec.pending, tut.pending, pra.pending)
    const { lec, tut, pra } = $AttendanceStore[index];
    const percentage = (
      ((lec.attended + tut.attended + pra.attended + lec.pending + tut.pending + pra.pending) /
        (lec.total + tut.total + pra.total + lec.pending + tut.pending + pra.pending)) *
      100
    ).toFixed(2);

    if (isNaN(parseFloat(percentage)) || !isFinite(parseFloat(percentage))) return '0.00';
    return percentage;
  };

  const skipAll = (index: number) => {
    // sum(lec.attended, tut.attended, pra.attended) /
    // sum(lec.total, tut.total, pra.total, lec.pending, tut.pending, pra.pending)
    const { lec, tut, pra } = $AttendanceStore[index];
    const percentage = (
      ((lec.attended + tut.attended + pra.attended) /
        (lec.total + tut.total + pra.total + lec.pending + tut.pending + pra.pending)) *
      100
    ).toFixed(2);

    if (isNaN(parseFloat(percentage)) || !isFinite(parseFloat(percentage))) return '0.00';
    return percentage;
  };

  const attendMin = (index: number) => {
    const { lec, tut, pra } = $AttendanceStore[index];
    // =IF((0.75*SUM(C6:E6,C7:E7)-SUM(C5:E5))<0,0, 0.75*SUM(C6:E6,C7:E7)-SUM(C5:E5))
    // SUM(C6:E6,C7:E7) = sum(lec.total, tut.total, pra.total, lec.pending, tut.pending, pra.pending)
    // SUM(C5:E5) = sum(lec.attended, tut.attended, pra.attended)
    const percentage = Math.max(
      0,
      0.75 * (lec.total + tut.total + pra.total + lec.pending + tut.pending + pra.pending) -
        (lec.attended + tut.attended + pra.attended)
    ).toFixed(2);

    if (isNaN(parseFloat(percentage)) || !isFinite(parseFloat(percentage))) return '0.00';
    return percentage;
  };

  const canOrCannotMakeIt = (index: number) => {
    const { lec, tut, pra } = $AttendanceStore[index];
    // if sum(lec.pending, tut.pending, pra.pending) > attendMin(index) then "You can make it to 75%"
    // else "You cannot make it to 75%"
    return lec.pending + tut.pending + pra.pending >
      0.75 * (lec.total + tut.total + pra.total + lec.pending + tut.pending + pra.pending) -
        (lec.attended + tut.attended + pra.attended)
      ? {
          msg: 'You can make it to 75%!',
          style: `color: #2ecc71; text-align: center; font-weight: 600;`
        }
      : {
          msg: 'You cannot make it to 75%!',
          style: `color: #e74c3c; text-align: center; font-weight: 600;`
        };
  };
</script>

<svelte:head>
  <title>Attendance Calculator</title>
  <meta
    name="description"
    content="Calculates minimum number of hours required to be attended to reach 75%"
  />
</svelte:head>

<div class="Attendance__header w-100">
  <h2>Attendance Calculator</h2>
  <p>Calculates minimum number of hours required to be attended to reach 75%</p>
</div>

<div class="Attendance__info w-100">
  <p>
    All undergraduate students at Shiv Nadar IoE are expected to be present for all of the scheduled
    classes. For whatever official or private reasons, a shortfall of no more than 25% is permitted
    in each course.

    <br /><br />
    <a
      class="FancyLink"
      data-type="Bracket"
      href="https://snulinks.snu.edu.in/snuPolicies/students/UNDERGRADUATE_HANDBOOK_2023-2024.pdf#page=14"
      target="_blank"
      rel="noopener noreferrer"
    >
      Ref: UG Handbook - pg. 14
    </a>
  </p>
  <em>
    Note: <br />
    - Calculate the tentative number of remaining hours based on the last teaching day and input in the
    pending column. <br />
    - Get the total number of hours for each course from SNU links &gt; Student Attendance Recording
    &gt; Reports &gt; Summary and enter the hours from
    <strong>Attendance with Credit Hours</strong>.
  </em>
  <figure class="CrispFigure" style="margin: 0 auto;">
    <img
      src={AttendanceCreditHours}
      style=" height: 150px; width: auto;"
      alt="Attendance Calculator"
      loading="lazy"
    />
    <figcaption>Attendance Credit Hours</figcaption>
  </figure>
</div>

<div class="w-100 Row--j-end">
  <button
    class="CrispButton"
    onclick={() => {
      $AttendanceStore = [
        ...$AttendanceStore,
        {
          code: `Course ${$AttendanceStore.length + 1}`,
          lec: {
            attended: 0,
            total: 0,
            pending: 0,
            hours: 1
          },
          tut: {
            attended: 0,
            total: 0,
            pending: 0,
            hours: 1
          },
          pra: {
            attended: 0,
            total: 0,
            pending: 0,
            hours: 1
          }
        }
      ];
    }}
  >
    Add Course
  </button>
</div>

<ul class="Attendance__content">
  {#each $AttendanceStore as course, index}
    <li class="AttendanceCard">
      <div class="w-100 gap-10 Row--between">
        <input
          class="CrispInput"
          type="text"
          placeholder={course.code}
          bind:value={$AttendanceStore[index].code}
        />
        <button
          data-type="danger"
          class="CrispButton"
          aria-label="Delete Course"
          data-icon={String.fromCharCode(58829)}
          disabled={$AttendanceStore.length === 1}
          onclick={() => {
            $AttendanceStore = $AttendanceStore.filter((_, i) => i !== index);
          }}
        ></button>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Attended</th>
            <th></th>
            <th>Total</th>
            <th>Pending</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>LEC</td>
            <td>
              <input
                type="number"
                class="CrispInput"
                bind:value={$AttendanceStore[index].lec.attended}
                onfocus={({ target }: Event) => {
                  if (target instanceof HTMLInputElement) {
                    target.select();
                  }
                }}
              />
            </td>
            <td>/</td>
            <td>
              <input
                type="number"
                class="CrispInput"
                bind:value={$AttendanceStore[index].lec.total}
                onfocus={({ target }: Event) => {
                  if (target instanceof HTMLInputElement) {
                    target.select();
                  }
                }}
              />
            </td>
            <td>
              <input
                type="number"
                class="CrispInput"
                style="--crp-input-min-width: 68px;"
                bind:value={$AttendanceStore[index].lec.pending}
                onfocus={({ target }: Event) => {
                  if (target instanceof HTMLInputElement) {
                    target.select();
                  }
                }}
              />
            </td>
          </tr>
          <tr>
            <td>TUT</td>
            <td>
              <input
                type="number"
                class="CrispInput"
                bind:value={$AttendanceStore[index].tut.attended}
                onfocus={({ target }: Event) => {
                  if (target instanceof HTMLInputElement) {
                    target.select();
                  }
                }}
              />
            </td>
            <td>/</td>
            <td>
              <input
                type="number"
                class="CrispInput"
                bind:value={$AttendanceStore[index].tut.total}
                onfocus={({ target }: Event) => {
                  if (target instanceof HTMLInputElement) {
                    target.select();
                  }
                }}
              />
            </td>
            <td>
              <input
                type="number"
                class="CrispInput"
                style="--crp-input-min-width: 68px;"
                bind:value={$AttendanceStore[index].tut.pending}
                onfocus={({ target }: Event) => {
                  if (target instanceof HTMLInputElement) {
                    target.select();
                  }
                }}
              />
            </td>
          </tr>
          <tr>
            <td>PRA</td>
            <td>
              <input
                class="CrispInput"
                type="number"
                bind:value={$AttendanceStore[index].pra.attended}
                onfocus={({ target }: Event) => {
                  if (target instanceof HTMLInputElement) {
                    target.select();
                  }
                }}
              />
            </td>
            <td>/</td>
            <td>
              <input
                class="CrispInput"
                type="number"
                bind:value={$AttendanceStore[index].pra.total}
                onfocus={({ target }: Event) => {
                  if (target instanceof HTMLInputElement) {
                    target.select();
                  }
                }}
              />
            </td>
            <td>
              <input
                class="CrispInput"
                type="number"
                style="--crp-input-min-width: 68px;"
                bind:value={$AttendanceStore[index].pra.pending}
                onfocus={({ target }: Event) => {
                  if (target instanceof HTMLInputElement) {
                    target.select();
                  }
                }}
              />
            </td>
          </tr>
          <tr>
            <td colspan="4"> Current Percentage </td>
            <td>
              :
              <strong>
                {calcPercentage(index)}%
              </strong>
            </td>
          </tr>
          <tr>
            <td colspan="4"> Attend all classes </td>
            <td>
              :
              <strong>
                {attendAll(index)}%
              </strong>
            </td>
          </tr>
          <!-- If you skip all remaining classes -->
          <tr>
            <td colspan="4"> Skip all classes </td>
            <td>
              :
              <strong>
                {skipAll(index)}%
              </strong>
            </td>
          </tr>
          <!-- No. of classes you need to attend for 75% -->
          <tr>
            <td colspan="4"> No. of <strong>Hours</strong> for 75% </td>
            <td>
              :
              <strong>
                {attendMin(index)}
              </strong>
            </td>
          </tr>
          <tr>
            <td colspan="5" style={canOrCannotMakeIt(index).style}>
              {canOrCannotMakeIt(index).msg}
            </td>
          </tr>
        </tbody>
      </table>
    </li>
  {/each}
</ul>

<style lang="scss">
  .AttendanceCard {
    padding: 15px 15px 20px 15px;
    border-radius: 15px;
    background: var(--prof-card-background-color);
    border: 1px solid var(--t-crp-border);
    @include make-flex($align: flex-start);
    gap: 15px;
    overflow-x: auto;
    min-width: 0;

    table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        padding: 5px;
        white-space: nowrap;
        vertical-align: top;
      }

      th {
        font-weight: 600;
        color: var(--subFg-1);
      }
    }
  }

  .Attendance {
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

    &__info {
      gap: 14px;
      @include make-flex($align: flex-start);

      & > p {
        font-size: 18px;
        text-align: justify;
        line-height: 1.6;
      }
    }

    &__content {
      list-style: none;
      padding: 0;
      margin: 0;
      gap: 20px;
      max-width: 100%;
      min-width: 0;
      width: 100%;

      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));

      @include respondAt(370px) {
        grid-template-columns: 1fr;
      }
    }
  }
</style>
