"""
User Session Management for Saree Sansar Bot
"""

from typing import Dict, Optional, Any
from datetime import datetime

# User sessions storage (in-memory)
USER_SESSIONS: Dict[int, dict] = {}


class UserSession:
    def __init__(self, user_id: int, data: dict = None):
        self.user_id = user_id
        self.data = data or {}
        self.created_at = self.data.get("created_at", datetime.now().isoformat())
        self.last_active = self.data.get("last_active", datetime.now().isoformat())
    
    def get(self, key: str, default: Any = None) -> Any:
        """Get session value"""
        return self.data.get(key, default)
    
    def set(self, key: str, value: Any) -> None:
        """Set session value"""
        self.data[key] = value
        self.last_active = datetime.now().isoformat()
        self._save()
    
    def clear(self, key: str = None) -> None:
        """Clear session value or all data"""
        if key:
            self.data.pop(key, None)
        else:
            self.data = {}
        self._save()
    
    def _save(self) -> None:
        """Save session to storage"""
        self.data["created_at"] = self.created_at
        self.data["last_active"] = self.last_active
        USER_SESSIONS[self.user_id] = self.data
    
    def to_dict(self) -> dict:
        return {
            "user_id": self.user_id,
            "data": self.data,
            "created_at": self.created_at,
            "last_active": self.last_active,
        }


def get_user_session(user_id: int) -> UserSession:
    """Get or create user session"""
    if user_id in USER_SESSIONS:
        return UserSession(user_id, USER_SESSIONS[user_id])
    
    # Create new session
    session = UserSession(user_id)
    session._save()
    return session


def get_user_state(user_id: int) -> str:
    """Get current user state (for conversation flow)"""
    session = get_user_session(user_id)
    return session.get("state", "idle")


def set_user_state(user_id: int, state: str, data: dict = None) -> None:
    """Set user state with optional data"""
    session = get_user_session(user_id)
    session.set("state", state)
    if data:
        session.set("state_data", data)


def clear_user_state(user_id: int) -> None:
    """Clear user state"""
    session = get_user_session(user_id)
    session.clear("state")
    session.clear("state_data")


def get_user_language(user_id: int) -> str:
    """Get user's preferred language"""
    session = get_user_session(user_id)
    return session.get("language", "hindlish")


def set_user_language(user_id: int, language: str) -> None:
    """Set user's preferred language"""
    session = get_user_session(user_id)
    session.set("language", language)


def get_all_users() -> list:
    """Get all user IDs (for broadcast)"""
    return list(USER_SESSIONS.keys())


def get_active_users_count() -> int:
    """Get count of active users"""
    return len(USER_SESSIONS)


# User profile data
def save_user_profile(user_id: int, name: str = None, phone: str = None, address: dict = None) -> None:
    """Save user profile data"""
    session = get_user_session(user_id)
    if name:
        session.set("name", name)
    if phone:
        session.set("phone", phone)
    if address:
        session.set("address", address)


def get_user_profile(user_id: int) -> dict:
    """Get user profile data"""
    session = get_user_session(user_id)
    return {
        "name": session.get("name"),
        "phone": session.get("phone"),
        "address": session.get("address"),
    }
