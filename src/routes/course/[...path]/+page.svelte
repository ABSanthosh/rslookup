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

<style lang="scss" src="../../../styles/routes/course.scss"></style>
