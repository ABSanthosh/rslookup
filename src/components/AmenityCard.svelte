<script lang="ts">
  import copyToClipboard from "$utils/CopyToClipboard";
  import MapsSelector from "$utils/MapsSelector";

  type Admin = {
    name: string;
    func: string;
    room: string;
    mail: string;
    phone: string;
  };

  type Simple = {
    name: string;
    lat: string;
    lng: string;
  };

  type Essentials = {
    name: string;
    lat: string;
    lng: string;
    time: {
      from: string;
      to: string;
    };
    mail: string;
    phone: string;
  };

  type Hostel = {
    name: string;
    lat: string;
    lng: string;
    mail: string;
    phone: string;
  };

  type DataType = Admin | Simple | Essentials | Hostel;

  export let { data, type } = $$props as {
    data: DataType;
    type: string;
  };

  // admin helpers
  function isAdmin(data: any): data is Admin {
    if (type === "Admin") {
      return (data as Admin).func !== undefined;
    }
    return false;
  }

  // Essentials helpers
  function isEssentials(data: any): data is Essentials {
    if (type === "Essentials" || type === "Food") {
      return (data as Essentials).time !== undefined;
    }
    return false;
  }

  // Academics helpers
  function isAcademics(data: any): data is Simple {
    if (type === "Academics" || type === "Sports") {
      return (data as Simple).lat !== undefined;
    }
    return false;
  }

  // Hostel helpers
  function isHostel(data: any): data is Hostel {
    if (type === "Hostel") {
      return (data as Hostel).lat !== undefined;
    }
    return false;
  }

  async function copy(dataType: string, type: "phone" | "mail") {
    if (dataType === "Admin") {
      if (type === "phone") await copyToClipboard((data as Admin).phone);
      if (type === "mail") await copyToClipboard((data as Admin).mail);
    }
    if (dataType === "Essentials") {
      if (type === "phone") await copyToClipboard((data as Essentials).phone);
      if (type === "mail") await copyToClipboard((data as Essentials).mail);
    }
  }
</script>

{#if type === "Admin" && isAdmin(data)}
  <div class="AmenityCard">
    <div class="Col--a-start gap-10">
      <h3>{data.name}</h3>
      <span>{data.func} - {data.room}</span>
    </div>
    <div class="AmenityCard__contact">
      <span data-icon={String.fromCharCode(57688)}>
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <p
          on:keypress={async () => await copy(type, "mail")}
          on:click={async () => await copy(type, "mail")}
        >
          {data.mail === "" ? "N/A" : data.mail}
        </p>
      </span>
      <span data-icon={String.fromCharCode(57520)}>
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <p
          on:click={async () => await copy(type, "phone")}
          on:keypress={async () => await copy(type, "phone")}
        >
          {data.phone === "" ? "N/A" : data.phone}
        </p>
      </span>
    </div>
  </div>
{/if}

{#if (type === "Essentials" || type === "Food") && isEssentials(data)}
  <div class="AmenityCard">
    <div class="Row--between gap-10 w-100">
      <h3>{data.name}</h3>
      <span data-icon={String.fromCharCode(59573)}>
        {data.time.from} - {data.time.to}
      </span>
    </div>
    <div class="Row--between gap-10 w-100 AmenityCard__bottom">
      <div class="AmenityCard__contact">
        <span data-icon={String.fromCharCode(57688)}>
          <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
          <p
            on:keypress={async () => await copy(type, "mail")}
            on:click={async () => await copy(type, "mail")}
          >
            {data.mail === "" ? "N/A" : data.mail}
          </p>
        </span>
        <span data-icon={String.fromCharCode(57520)}>
          <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
          <p
            on:click={async () => await copy(type, "phone")}
            on:keypress={async () => await copy(type, "phone")}
          >
            {data.phone === "" ? "N/A" : data.phone}
          </p>
        </span>
      </div>
      <a
        class="FancyButton"
        data-icon={String.fromCharCode(58715)}
        href={MapsSelector(data.lat, data.lng)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Map
      </a>
    </div>
  </div>
{/if}

{#if (type === "Academics" || type === "Sports") && isAcademics(data)}
  <div class="AmenityCard">
    <div class="Row--between AmenityCard__bottom--simple gap-10 w-100">
      <h3>{data.name}</h3>

      <a
        class="FancyButton"
        data-icon={String.fromCharCode(58715)}
        href={MapsSelector(data.lat, data.lng)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Map
      </a>
    </div>
  </div>
{/if}

{#if type === "Hostel" && isHostel(data)}
  <div class="AmenityCard">
    <div class="Row--between gap-10 w-100">
      <h3>{data.name}</h3>
    </div>
    <div class="Row--between gap-10 w-100 AmenityCard__bottom">
      <div class="AmenityCard__contact">
        <span data-icon={String.fromCharCode(57688)}>
          <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
          <p
            on:keypress={async () => await copy(type, "mail")}
            on:click={async () => await copy(type, "mail")}
          >
            {data.mail === "" ? "N/A" : data.mail}
          </p>
        </span>
        <span data-icon={String.fromCharCode(57520)}>
          <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
          <p
            on:click={async () => await copy(type, "phone")}
            on:keypress={async () => await copy(type, "phone")}
          >
            {data.phone === "" ? "N/A" : data.phone}
          </p>
        </span>
      </div>
      <a
        class="FancyButton"
        data-icon={String.fromCharCode(58715)}
        href={MapsSelector(data.lat, data.lng)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Map
      </a>
    </div>
  </div>
{/if}

<style lang="scss">
  .AmenityCard {
    gap: 25px;
    padding: 10px;
    border-radius: 10px;
    @include box(auto, auto);
    background: var(--ProfCardBG);
    border: 1px solid var(--border);
    @include make-flex($just: flex-start, $align: flex-start);

    h3 {
      font-size: 20px;
      color: var(--foreground);
    }
    span {
      color: var(--subText);
      font-size: 16px;
      font-weight: 400;
    }
    &__contact {
      gap: 10px;
      @include box();
      @include make-flex($align: flex-start);
      & > span {
        p {
          cursor: pointer;
          overflow: hidden;
          white-space: nowrap;
          display: inline-block;
          text-overflow: ellipsis;
          &:hover {
            text-decoration: underline;
          }
        }

        gap: 6px;
        font-size: 14px;
        color: var(--subText);
        @include make-flex($dir: row, $just: flex-start);
        &::before {
          font-size: 18px;
        }
      }
    }

    &__bottom {
      align-items: flex-end;
      @include respondAt(405px) {
        flex-direction: column;
      }
    }

    &__bottom,
    &__bottom--simple {
      & > a {
        gap: 5px;
        padding: 7px;
        text-decoration: none;

        &::before {
          font-size: 17px;
        }

        &:hover {
          color: var(--foreground);
        }
      }
    }
  }
</style>
