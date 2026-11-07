import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Pas de cache incrémental : les pages sont rendues à la demande, donc toujours à jour.
export default defineCloudflareConfig();
