<script lang="ts">
  import { AttendanceStore } from "$lib/AttendanceStore";

  $: calcPercentage = (index: number) => {
    const percentage = parseFloat(
      `${
        (($AttendanceStore[index].lec.attended +
          $AttendanceStore[index].tut.attended +
          $AttendanceStore[index].pra.attended) /
          ($AttendanceStore[index].lec.total +
            $AttendanceStore[index].tut.total +
            $AttendanceStore[index].pra.total)) *
        100
      }`
    ).toFixed(2);

    if (isNaN(parseFloat(percentage))) return "0.00";
    return percentage;
  };

  $: attendAll = (index: number) => {
    // add all attended hours and pending hours / add all total hours and pending hours
    const attended =
      $AttendanceStore[index].lec.attended +
      $AttendanceStore[index].tut.attended +
      $AttendanceStore[index].pra.attended;
    const total =
      $AttendanceStore[index].lec.total +
      $AttendanceStore[index].tut.total +
      $AttendanceStore[index].pra.total;
    const pending =
      $AttendanceStore[index].lec.pending +
      $AttendanceStore[index].tut.pending +
      $AttendanceStore[index].pra.pending;

    const percentage = parseFloat(
      `${((attended + pending) / (total + pending)) * 100} `
    ).toFixed(2);

    if (isNaN(parseFloat(percentage))) return "0.00";
    return percentage;
  };

  $: skipAll = (index: number) => {
    // sum of all attended hours / sum of all total hours + pending hours
    const attended =
      $AttendanceStore[index].lec.attended +
      $AttendanceStore[index].tut.attended +
      $AttendanceStore[index].pra.attended;
    const total =
      $AttendanceStore[index].lec.total +
      $AttendanceStore[index].tut.total +
      $AttendanceStore[index].pra.total;
    const pending =
      $AttendanceStore[index].lec.pending +
      $AttendanceStore[index].tut.pending +
      $AttendanceStore[index].pra.pending;

    const percentage = parseFloat(
      `${(attended / (total + pending)) * 100}`
    ).toFixed(2);

    if (isNaN(parseFloat(percentage))) return "0.00";
    return percentage;
  };
</script>

<div class="Attendance__header w-100">
  <h2>Attendance Calculator</h2>
  <p>Calculates minimum number of hours required to be attended to reach 75%</p>
</div>

<div class="Attendance__info w-100">
  <p>
    All undergraduate students at Shiv Nadar IoE are expected to be present for
    all of the scheduled classes. For whatever official or private reasons, a
    shortfall of no more than 25% is permitted in each course.

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
</div>

<div class="w-100 Row--j-end">
  <button
    class="CrispButton"
    on:click={() => {
      $AttendanceStore = [
        ...$AttendanceStore,
        {
          code: `Course ${$AttendanceStore.length + 1}`,
          lec: {
            attended: 0,
            total: 0,
            pending: 0,
          },
          tut: {
            attended: 0,
            total: 0,
            pending: 0,
          },
          pra: {
            attended: 0,
            total: 0,
            pending: 0,
          },
        },
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
          class="CrispButton"
          data-icon={String.fromCharCode(58829)}
          data-type="danger"
          disabled={$AttendanceStore.length === 1}
          on:click={() => {
            $AttendanceStore = $AttendanceStore.filter((_, i) => i !== index);
          }}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th />
            <th>Attended</th>
            <th />
            <th>Total</th>
            <th>Pending</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>LEC</td>
            <td>
              <input
                class="CrispInput"
                type="number"
                bind:value={$AttendanceStore[index].lec.attended}
                on:focus={({ target }) => {
                  // @ts-ignore
                  target.select();
                }}
              />
            </td>
            <td>/</td>
            <td>
              <input
                class="CrispInput"
                type="number"
                bind:value={$AttendanceStore[index].lec.total}
                on:focus={({ target }) => {
                  // @ts-ignore
                  target.select();
                }}
              />
            </td>
            <td>
              <input
                class="CrispInput"
                type="number"
                style="--crp-input-min-width: 68px;"
                bind:value={$AttendanceStore[index].lec.pending}
                on:focus={({ target }) => {
                  // @ts-ignore
                  target.select();
                }}
              />
            </td>
          </tr>
          <tr>
            <td>TUT</td>
            <td>
              <input
                class="CrispInput"
                type="number"
                bind:value={$AttendanceStore[index].tut.attended}
                on:focus={({ target }) => {
                  // @ts-ignore
                  target.select();
                }}
              />
            </td>
            <td>/</td>
            <td>
              <input
                class="CrispInput"
                type="number"
                bind:value={$AttendanceStore[index].tut.total}
                on:focus={({ target }) => {
                  // @ts-ignore
                  target.select();
                }}
              />
            </td>
            <td>
              <input
                class="CrispInput"
                type="number"
                style="--crp-input-min-width: 68px;"
                bind:value={$AttendanceStore[index].tut.pending}
                on:focus={({ target }) => {
                  // @ts-ignore
                  target.select();
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
                on:focus={({ target }) => {
                  // @ts-ignore
                  target.select();
                }}
              />
            </td>
            <td>/</td>
            <td>
              <input
                class="CrispInput"
                type="number"
                bind:value={$AttendanceStore[index].pra.total}
                on:focus={({ target }) => {
                  // @ts-ignore
                  target.select();
                }}
              />
            </td>
            <td>
              <input
                class="CrispInput"
                type="number"
                style="--crp-input-min-width: 68px;"
                bind:value={$AttendanceStore[index].pra.pending}
                on:focus={({ target }) => {
                  // @ts-ignore
                  target.select();
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
            <td colspan="4"> If you attend all remaining classes </td>
            <td>
              :
              <strong>
                {attendAll(index)}%
              </strong>
            </td>
          </tr>
          <!-- If you skip all remaining classes -->
          <tr>
            <td colspan="4"> If you skip all remaining classes </td>
            <td>
              :
              <strong>
                {skipAll(index)}%
              </strong>
            </td>
          </tr>
        </tbody>
      </table>
    </li>
  {/each}
</ul>

<style lang="scss">
  .AttendanceCard {
    @include box();
    padding: 15px 15px 20px 15px;
    border-radius: 15px;
    background: var(--ProfCardBG);
    border: 1px solid var(--border);
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
        // border-bottom: 1px solid var(--border);
        // text-align: center;
      }

      th {
        font-weight: 600;
        color: var(--subText);
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
        color: var(--subText);
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

      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));

      @include respondAt(370px) {
        grid-template-columns: 1fr;
      }
    }
  }
</style>
