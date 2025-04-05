<script lang="ts">
  import ProfCard from '$components/ProfCard/ProfCard.svelte';
  import SchoolChip from '$components/ProfCard/SchoolChip.svelte';
  import SubChip from '$components/ProfCard/SubChip.svelte';
  import { profColors, schools } from '$data/prof';
  import type { IAcadAdvisors } from '$types/Acad.types';
  import type { PageData } from './$types';

  let {
    data
  }: {
    data: PageData;
  } = $props();
</script>

<svelte:head>
  <title>Academic Helpdesk</title>
  <meta
    name="description"
    content="Everyone you need to know to get your academic queries solved!"
  />
  <meta
    name="keywords"
    content={`
    professors, 
    teachers, 
    educators, 
    snu, 
    snioe, 
    Shiv Nadar University, 
    room number,
    room no.,
    snu.edu.in,
    ${data.office.map((item) => item.name).join(', ')},
		${data.advisors.map((item) => item.name).join(', ')},
		${data.committee.map((item) => item.name).join(', ')},
    `}
  />
  <meta name="author" content="Santhosh" />
  <meta name="robots" content="index, follow" />
</svelte:head>

<div class="Acad__header w-100">
  <h2>Academic Helpdesk</h2>
  <p>
    Find everything you need to get your academic queries solved!
  </p>
</div>

<section class="Acad__section">
  <h2>
    <span> Office of the Dean of Academics </span>
    <hr />
  </h2>
  <p>
    The Office of the Dean of Academics has the responsibility for developing and implementing the
    academic and administrative policies pertaining to the programs and students of the University,
    in accordance with the University's mission to “help students acquire and develop knowledge,
    skills, and leadership qualities relevant in the 21st Century and beyond”.
  </p>
  <div class="Acad__content">
    {#each data.office as item}
      <!-- We are using same ProfCard for acad so we're using some extra things  -->
      <ProfCard
        name={item.name}
        img={item.image}
        mail={item.email}
        block={''}
        role={item.position}
        website={item.website}
        room={item.room}
        phone={item.extension}
        school=""
        department=""
        timesheet=""
      />
    {/each}
  </div>
</section>

{#snippet AdvisorCard(item: IAcadAdvisors)}
  <div
    class="AcadCard gap-20"
    style="
    --background-color: {profColors[schools[item.school]?.color].secondary ||
      profColors.gray.secondary};
    --color: {profColors[schools[item.school]?.color].primary || profColors.gray.primary};
    "
  >
    <div class="AcadCard__top Row--start gap-15">
      <div class="Col--a-start w-100 gap-5">
        <h3>{item.name}</h3>
        <div class="AcadCard__separator">
          <span class="AcadCard__separator--icon" data-icon="location_on"> Room </span>
          <hr />
          <span class="AcadCard__separator--content">
            {item.room}
          </span>
        </div>
      </div>
    </div>
    {#if item.school !== '' && item.school !== '-' && item.department !== '' && item.department !== '-'}
      <div class="AcadCard__middle">
        {#if item.school !== '' && item.school !== '-'}
          <SchoolChip
            label={item.school}
            color={profColors[schools[item.school]?.color] || profColors.gray}
          />
        {/if}
        {#if item.department !== '' && item.department !== '-'}
          <SubChip
            label={item.department}
            color={profColors[schools[item.school]?.color] || profColors.gray}
          />
        {/if}
      </div>
    {/if}
  </div>
{/snippet}

<section class="Acad__section">
  <h2>
    UG Advisors
    <hr />
  </h2>
  <div class="Acad__content">
    {#each data.advisors as item}
      {@render AdvisorCard(item)}
    {/each}
  </div>
</section>

<section class="Acad__section">
  <h2>
    Academic Affairs Committee
    <hr />
  </h2>
  <div style="align-items: flex-start; overflow-x: auto; width: 100%; padding-bottom: 10px">
    <table class="CrispTable">
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
            <td data-label="Name" style="white-space: wrap;">{item.name}</td>
            <td data-label="Position" style="white-space: wrap;">{item.position}</td>
            <td data-label="Name" style="white-space: wrap;">{item.email}</td>
            <td data-label="Major" style="white-space: wrap;">{item.major}</td>
          </tr>
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4">
            Showing {data.committee.length} item(s)
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</section>

<style lang="scss">
  .AcadCard {
    @include box();
    padding: 15px;
    border-radius: 20px;
    border: 1px solid var(--color);
    background: var(--background-color);

    @include make-flex();
    align-items: stretch;

    &__separator {
      gap: 12px;
      @include box($height: auto);
      @include make-flex($dir: row);

      &--icon {
        gap: 5px;
        font-size: 14px;
        @include box(auto);
        color: var(--subFg-1);
        @include make-flex($dir: row);

        &::before {
          margin-top: 2px;
          font-size: 16px;
          color: var(--subFg-1);
        }
      }

      & > hr {
        border-bottom: 1px solid var(--lab-item-separator);
        border-top: none;
        border-left: none;
        border-right: none;
        flex-grow: 1;
        user-select: none;
      }

      &--content {
        font-size: 14px;
        font-weight: 600;

        overflow: hidden;
        white-space: nowrap;
        display: inline-block;
        text-overflow: ellipsis;
      }
    }

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
        color: var(--subFg-1);
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

      @include respondAt(680px) {
        margin: 40px 0 0 0;
      }

      & > h2 {
        font-size: 40px;
        font-weight: 900;
        line-height: normal;
        color: var(--foreground);
      }

      & > p {
        font-size: 20px;
        font-weight: 400;
        color: var(--subFg-1);

        & > em {
          font-size: 16px;
          font-weight: 400;
          color: var(--subFg-1);
        }
      }
    }

    &__section {
      @include box();
      // padding-top: 10px;
      gap: 20px;
      @include make-flex($just: flex-start);

      @include respondAt(680px) {
        padding: 0;
        margin: 10px 0 0px 0;
        @include make-flex($just: flex-start, $align: flex-start);
      }

      & > h2 {
        gap: 10px;
        line-height: normal;
        white-space: nowrap;
        @include box($height: auto);
        @include make-flex($dir: row, $just: flex-start);

        @include respondAt(430px) {
          white-space: normal;
        }

        & > hr {
          background: var(--lab-item-separator);
          height: 1px;
          flex-grow: 1;
          border: none;
        }
      }
      & > p {
        font-size: 18px;
        font-weight: 400;
        color: var(--subFg-1);
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
    }
  }
</style>
