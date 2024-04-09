<script lang="ts">
  import ProfCard from "$components/ProfCard.svelte";
  import SchoolChip from "$components/SchoolChip.svelte";
  import SubChip from "$components/SubChip.svelte";
  import { profColors, schools } from "$utils/prof";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="Acad__header w-100">
  <h2>Academic Helpdesk</h2>
  <p>Find everything you need to get your academic queries solved!</p>
</div>

<section class="Acad__section">
  <h2>
    Office of the Dean of Academics
    <hr />
  </h2>
  <p>
    The Office of the Dean of Academics has the responsibility for developing
    and implementing the academic and administrative policies pertaining to the
    programs and students of the University, in accordance with the University's
    mission to “help students acquire and develop knowledge, skills, and
    leadership qualities relevant in the 21st Century and beyond”.
  </p>
  <div class="Acad__content">
    {#each data.office as item}
      <ProfCard
        profResult={{
          block: "",
          name: item.name,
          img: item.image,
          mail: item.email,
          role: item.position,
          website: item.website,
          room: item.room,
          phone: item.extension,
          school: "",
          department: "",
          timesheet: "",
          gImage: "",
        }}
      />
    {/each}
  </div>
</section>

<section class="Acad__section" style="padding-top: 40px;">
  <h2>
    UG Advisors
    <hr />
  </h2>
  <div class="Acad__content">
    {#each data.advisors as item}
      <div class="AcadCard gap-20">
        <div class="AcadCard__top Row--start gap-15">
          <div class="Col--a-start gap-5">
            <h3>{item.name}</h3>
            <span>{item.room}</span>
          </div>
        </div>
        {#if item.school !== "" && item.school !== "-" && item.department !== "" && item.department !== "-"}
          <div class="AcadCard__middle">
            {#if item.school !== "" && item.school !== "-"}
              <SchoolChip
                label={item.school}
                color={profColors[schools[item.school]?.color] ||
                  profColors.gray}
              />
            {/if}
            {#if item.department !== "" && item.department !== "-"}
              <SubChip
                label={item.department}
                color={profColors[schools[item.school]?.color] ||
                  profColors.gray}
              />
            {/if}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</section>

<section
  class="Acad__section"
  style="padding-top: 40px;align-items: flex-start;overflow-x: auto"
>
  <h2>
    Academic Affairs Committee
    <hr />
  </h2>
  <table>
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Position</th>
        <th scope="col">Email</th>
        <th scope="col">Major</th>
      </tr>
    </thead>
    <tbody>
      {#each data.committee as item}
        <tr>
          <td data-label="Name">{item.name}</td>
          <td data-label="Position">{item.position}</td>
          <td data-label="Name">{item.email}</td>
          <td data-label="Major">{item.major}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>

<style lang="scss">
  .AcadCard {
    @include box();
    padding: 15px;
    border-radius: 20px;
    background: var(--ProfCardBG);
    border: 1px solid var(--border);
    font-family: "Inter", sans-serif;

    @include make-flex();
    align-items: stretch;

    &__top {
      max-width: 100%;
      @include box(100%, auto);

      & > div {
        max-width: 100%;
        overflow: hidden;
      }

      h3 {
        font-size: 20px;
        overflow: hidden;
        text-wrap: nowrap;
        max-width: 100%;
        text-overflow: ellipsis;
      }

      span {
        color: var(--subText);
        font-size: 16px;
        font-weight: 400;
      }
    }

    &__middle {
      gap: 10px;
      @include box(100%, auto);
      @include make-flex($align: flex-start);
    }
  }

  .Acad {
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

    &__section {
      @include box();
      padding-top: 10px;
      gap: 20px;
      @include make-flex($just: flex-start);

      @include respondAt(680px) {
        padding: 0;
        margin: 20px 0 20px 0;
        @include make-flex($just: flex-start, $align: flex-start);
      }

      & > h2 {
        gap: 10px;
        white-space: nowrap;
        @include box($height: auto);
        @include make-flex($dir: row, $just: flex-start);

        & > hr {
          background: var(--LabSeparator);
          @include box(100%, 1px);
          border: none;
        }
      }

      table {
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
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
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
    }

    &__content {
      gap: 18px;
      min-width: 0;
      @include box();

      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: minmax(50px, auto) 1fr;

      max-width: 100%;
      overflow-x: hidden;
      
      @include respondAt(800px) {
        grid-template-columns: 1fr;
        @include make-flex();
      }

      // & > span {
      //   max-width: 100%;
      //   overflow-x: hidden;
      //   @include make-flex();
      // }
    }
  }
</style>
