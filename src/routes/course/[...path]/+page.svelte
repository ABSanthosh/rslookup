<script lang="ts">
  import type { IResItem } from "../course";
  import TypeIcon from "./TypeIcon.svelte";

  export let data;

  $: folders = data.pwd as IResItem | null;

  const isViewerFriendly = (filename: string) => {
    const extensions = ["pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx"];
    return extensions.includes(
      filename.substring(filename.lastIndexOf(".") + 1, filename.length)
    );
  };
</script>

<div class="Course__header w-100">
  <h2>Course resources</h2>
  <p>Exam papers, notes, and more...</p>
</div>

<main class="Course__bottom w-100">
  <ul class="Course__table">
    <li class="Course__table--header">
      <h3>Name</h3>
    </li>

    {#if folders}
      {#if !data.isRoot}
        <li class="Course__table--item">
          <a href={data.parentPath} data-sveltekit-replacestate>
            <span class="Row--start gap-10">
              <TypeIcon type="directory" />
              ..
            </span>
          </a>
        </li>
      {/if}
      {#each folders.contents as item (item.name)}
        {#if item.type === "directory"}
          <li class="Course__table--item">
            <!-- data-sveltekit-replacestate -->
            <a
              href={`/course${data.basePath}/${item.name}`}
              data-icon-after={String.fromCharCode(58828)}
            >
              <span class="Row--start gap-10">
                <TypeIcon type={item.type} />
                {item.name}
              </span>
            </a>
          </li>
        {:else}
          <li class="Course__table--item Course__table--file">
            <span class="Row--start gap-10">
              <TypeIcon type={item.type} />
              {item.name}
            </span>
            <span class="Row--center h-100 gap-10">
              {#if isViewerFriendly(item.name)}
                <a
                  class="FancyButton"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="You'll have to wait for the file to load."
                  href="https://docs.google.com/viewer?url=https://raw.githubusercontent.com/ABSanthosh/rslookup/rs-data{data.basePath}/{item.name}"
                >
                  Preview (β)
                </a>
              {/if}
              <a
                class="FancyButton"
                target="_blank"
                rel="noopener noreferrer"
                href="https://raw.githubusercontent.com/ABSanthosh/rslookup/rs-data{data.basePath}/{item.name}"
              >
                Download
              </a>
            </span>
          </li>
        {/if}
      {/each}
    {/if}
  </ul>
</main>

<style lang="scss">
  .Course {
    &__header {
      @include make-flex($align: flex-start);
      margin: 40px 0 10px 0;
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
      @include make-flex($dir: row, $align: flex-start);
      gap: 24px;

      @include respondAt(630px) {
        flex-direction: column;
      }
    }

    &__table {
      --__borderRadius: 6px;
      --__headerBorderRadius: var(--__borderRadius) var(--__borderRadius) 0 0;

      overflow: unset;
      list-style: none;
      @include box($height: auto);
      border: 1px solid var(--border);
      border-radius: var(--__borderRadius);

      &--header {
        font-size: 12px;
        padding: 0 16px;
        @include box($height: 40px);
        color: var(--tableHeaderFG);
        @include make-flex($align: flex-start);
        background-color: var(--tableHeaderBG);
        border-radius: var(--__headerBorderRadius);
      }

      &--item {
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        @include box($height: 40px);
        border-top: 1px solid var(--border);

        & > a,
        & > span {
          overflow: hidden;
          white-space: nowrap;
        }

        a {
          gap: 15px;
          @include box();
          padding: 0 16px;
          position: relative;
          text-decoration: none;
          color: var(--foreground);
          @include make-flex($dir: row, $just: space-between);
          &::after {
            right: 0;
            opacity: 0;
            position: absolute;
            top: 50%;
            transform: translate(-20px, -50%);
            transition: opacity 0.3s, transform 0.3s ease;
          }

          &:hover {
            &::after {
              opacity: 1;
              transform: translate(-15px, -50%);
            }
          }
        }

        &:last-child {
          border-radius: 0 0 var(--__borderRadius) var(--__borderRadius);
        }

        &:hover {
          background-color: var(--elevatedBG);
        }
      }

      &--file {
        gap: 15px;
        @include make-flex($dir: row, $just: space-between);
        padding: 5.5px 5.5px 5.5px 16px;
        a {
          overflow: hidden;
          text-align: center;
          width: auto;
          flex-shrink: 0;
        }
      }
    }
  }
</style>
