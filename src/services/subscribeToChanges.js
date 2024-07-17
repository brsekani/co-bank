import supabase from "../supabase";

const subscribeToChanges = () => {
  supabase
    .channel("custom-insert-channel")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "goals" },
      (payload) => {
        console.log("INSERT Change received!", payload);
      }
    )
    .subscribe();

  supabase
    .channel("custom-update-channel")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "goals" },
      (payload) => {
        console.log("UPDATE Change received!", payload);
      }
    )
    .subscribe();

  supabase
    .channel("custom-delete-channel")
    .on(
      "postgres_changes",
      { event: "DELETE", schema: "public", table: "goals" },
      (payload) => {
        console.log("DELETE Change received!", payload);
      }
    )
    .subscribe();

  supabase
    .channel("custom-filter-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "goals",
        filter: "some_column=eq.some_value",
      },
      (payload) => {
        console.log("FILTER Change received!", payload);
      }
    )
    .subscribe();
};

export default subscribeToChanges;
