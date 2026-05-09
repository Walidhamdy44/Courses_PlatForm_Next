"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Loader2,
  KeyRound,
} from "lucide-react";

interface Props {
  requests: any[];
}

const TeacherRequestList = ({ requests }: Props) => {
  const router = useRouter();
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [codeModal, setCodeModal] = useState<{
    id: string;
    action: "approve" | "reject";
  } | null>(null);
  const [code, setCode] = useState("");

  const handleAction = async (id: string, action: "approve" | "reject") => {
    if (action === "approve") {
      setCodeModal({ id, action });
      setCode("");
      return;
    }

    // Reject doesn't need code
    try {
      setProcessingId(id);
      await axios.post(`/api/teacher-request/${id}`, { action, code: "" });
      toast.success("Request rejected");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data || "Something went wrong");
    } finally {
      setProcessingId(null);
    }
  };

  const handleApproveWithCode = async () => {
    if (!codeModal) return;
    if (code.length !== 6) {
      toast.error("Please enter the 6-digit code");
      return;
    }

    try {
      setProcessingId(codeModal.id);
      await axios.post(`/api/teacher-request/${codeModal.id}`, {
        action: "approve",
        code,
      });
      toast.success("Teacher approved!");
      setCodeModal(null);
      setCode("");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data || "Invalid code");
    } finally {
      setProcessingId(null);
    }
  };

  const pending = requests.filter((r) => r.status === "pending");
  const processed = requests.filter((r) => r.status !== "pending");

  return (
    <div className="space-y-6">
      {/* Pending Requests */}
      {pending.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Pending ({pending.length})
          </h2>
          <div className="space-y-4">
            {pending.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                processingId={processingId}
                onAction={handleAction}
              />
            ))}
          </div>
        </div>
      )}

      {/* Processed Requests */}
      {processed.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Processed ({processed.length})
          </h2>
          <div className="space-y-4">
            {processed.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                processingId={processingId}
                onAction={handleAction}
                readonly
              />
            ))}
          </div>
        </div>
      )}

      {requests.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No teacher requests yet</p>
        </div>
      )}

      {/* Code Verification Modal */}
      {codeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setCodeModal(null)}
          />
          <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#E3DFFF] flex items-center justify-center mx-auto mb-3">
                <KeyRound className="w-6 h-6 text-[#2F288B]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Enter Verification Code
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Enter the 6-digit code from the email to approve this request
              </p>
            </div>

            <input
              type="text"
              value={code}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                setCode(val);
              }}
              placeholder="000000"
              maxLength={6}
              className="w-full text-center text-2xl font-bold tracking-[0.3em] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors"
              autoFocus
            />

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setCodeModal(null)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApproveWithCode}
                disabled={code.length !== 6 || processingId === codeModal.id}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#2F288B] text-white text-sm font-medium hover:bg-[#3E399A] transition-colors disabled:opacity-60"
              >
                {processingId === codeModal.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function RequestCard({
  request,
  processingId,
  onAction,
  readonly,
}: {
  request: any;
  processingId: string | null;
  onAction: (id: string, action: "approve" | "reject") => void;
  readonly?: boolean;
}) {
  const profile = request.profile;
  const name =
    profile?.displayName ||
    `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim() ||
    "User";

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full overflow-hidden bg-[#E3DFFF] flex-shrink-0">
          {profile?.profileImage ? (
            <Image
              src={profile.profileImage}
              alt={name}
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-6 h-6 text-[#2F288B]" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
            <StatusBadge status={request.status} />
          </div>
          <p className="text-xs text-gray-500">{profile?.email}</p>

          <div className="mt-3 space-y-2">
            <div>
              <span className="text-xs font-medium text-gray-400">
                Expertise:
              </span>
              <p className="text-sm text-gray-700">{request.expertise}</p>
            </div>
            <div>
              <span className="text-xs font-medium text-gray-400">
                Experience:
              </span>
              <p className="text-sm text-gray-700">{request.experience}</p>
            </div>
            <div>
              <span className="text-xs font-medium text-gray-400">
                Motivation:
              </span>
              <p className="text-sm text-gray-700">{request.motivation}</p>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            {new Date(request.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {/* Actions */}
        {!readonly && request.status === "pending" && (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onAction(request.id, "approve")}
              disabled={processingId === request.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium hover:bg-emerald-100 transition-colors disabled:opacity-60"
            >
              {processingId === request.id ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <CheckCircle2 className="w-3 h-3" />
              )}
              Approve
            </button>
            <button
              onClick={() => onAction(request.id, "reject")}
              disabled={processingId === request.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-medium hover:bg-red-100 transition-colors disabled:opacity-60"
            >
              <XCircle className="w-3 h-3" />
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "pending") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700">
        <Clock className="w-2.5 h-2.5" />
        Pending
      </span>
    );
  }
  if (status === "approved") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700">
        <CheckCircle2 className="w-2.5 h-2.5" />
        Approved
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-50 text-red-700">
      <XCircle className="w-2.5 h-2.5" />
      Rejected
    </span>
  );
}

export default TeacherRequestList;
