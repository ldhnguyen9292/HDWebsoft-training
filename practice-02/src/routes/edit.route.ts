import { ServerRoute } from "@hapi/hapi";
import { editController } from "./../controllers/edit.controller";
import { EditParams, EditPayload } from "./../interfaces/edit.interface";

export const editRouter: ServerRoute[] = [{
    path: '/events/{event_id}/editable/me',
    method: "POST",
    options: {
        handler: editController.isEditing,
        description: "Is editing?",
        notes: "Return the edit status and mark user",
        tags: ['api', 'edit event'],
        validate: {
            params: EditParams,
            payload: EditPayload
        }
    }
}, {
    path: '/events/{event_id}/editable/release',
    method: "POST",
    options: {
        handler: editController.releaseEditButton,
        description: "Release edit button",
        notes: "Allow frontend to release edit button",
        tags: ['api', 'edit event'],
        validate: {
            params: EditParams,
            payload: EditPayload
        }
    }
}, {
    path: '/events/{event_id}/editable/extend',
    method: "POST",
    options: {
        handler: editController.extendExpire,
        description: "Release edit button",
        notes: "Allow frontend to release edit button",
        tags: ['api', 'edit event'],
        validate: {
            params: EditParams,
            payload: EditPayload
        }
    }
}]