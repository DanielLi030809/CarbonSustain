from django.http import HttpResponse
from .jsondb import load_data, safe_write
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import ActionSerializer
import uuid


def get_actions():
    try:
        actions = load_data()
    except Exception as e:
        return Response(
            {
                "error": "Failed to fetch all actions",
                "error_detail": str(e)
             },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    return Response(
        {
            "message": "Successfully fetched all actions from json file",
            "fetched_actions": actions,
        },
        status=status.HTTP_200_OK
    )

def add_action(request):
    s = ActionSerializer(data=request.data)
    if not s.is_valid():
        return Response(
            {
                "error": "User submitted invalid data",
                "error detail": s.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    try:
        new_action = dict(s.validated_data)  # Convert to mutable dict
        new_action["id"] = str(uuid.uuid4())
        # Convert date object to string for JSON serialization
        #if 'date' in new_action and hasattr(new_action['date'], 'isoformat'):
        #    new_action['date'] = new_action['date'].isoformat()
        actions = load_data()
        actions.append(new_action)
        safe_write(actions)
    except Exception as e:
        return Response(
            {
                "error": "Failed to add new action to json file",
                "error_detail": str(e)
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    return Response(
        {
            "message": "Successfully added new action to json file",
            "added_action": new_action
        },
        status=status.HTTP_201_CREATED
    )

def update_action(request, action_id):
    s = ActionSerializer(request.data)
    if not s.is_valid():
        return Response(
            {
                "error": "User submitted invalid update data",
                "error_detail": s.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    try:
        target_id = action_id
        actions = load_data()
        target_action = None
        for action in actions:
            if action["id"] == target_id:
                target_action = action
                break
        if not target_action:
            return Response(
                {
                    "error": f"Action with id {action_id} to update not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )
        target_action["action"] = s.validated_data["action"]
        target_action["date"] = s.validated_data["date"]
        target_action["points"] = s.validated_data["points"]
        safe_write(actions)
    except Exception as e:
        return Response(
            {
                "error": f"Failed to update action with action id {action_id}",
                "error_detail": str(e)
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    return Response(
        {
            "message": f"Successfully updated action with id {target_id}",
            "updated_action": target_action
        },
        status=status.HTTP_200_OK
    )

def delete_action(action_id):
    try:
        target_id = action_id
        actions = load_data()
        deleted_action = None

        for action in actions:
            if action["id"] == target_id:
                deleted_action = action
                break
        if deleted_action is None:
            return Response(
                {
                    "error": f"Action with id {action_id} to delete not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )
        actions = [action for action in actions if action["id"] != target_id]
        safe_write(actions)
    except Exception as e:
        return Response(
            {
                "error": f"Failed to delete action with action id {action_id}",
                "error_detail": str(e)
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    return Response(
        {
            "message": f"Successfully deleted action with action id {action_id}",
            "deleted_action": deleted_action
        },
        status=status.HTTP_200_OK
    )


@api_view(['PUT', 'DELETE'])
def update_or_delete_actions(request, action_id):
    if request.method == 'PUT':
        return update_action(request, action_id)
    elif request.method == 'DELETE':
        return delete_action(action_id)
    
@api_view(['GET', 'POST'])
def get_or_add_actions(request):
    if request.method == 'GET':
        return get_actions()
    elif request.method == 'POST':
        return add_action(request)


                
