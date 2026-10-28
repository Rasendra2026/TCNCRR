#!/usr/bin/env python3
"""
Twin City NCR Realty - Hostinger Direct FTP/FTPS Uploader
Uploads the production dist/ bundle to Hostinger public_html/
"""

import os
import sys
from ftplib import FTP, FTP_TLS

def upload_directory(ftp, local_dir, remote_dir):
    print(f"[*] Navigating to remote directory: {remote_dir}")
    try:
        ftp.cwd(remote_dir)
    except Exception:
        ftp.mkd(remote_dir)
        ftp.cwd(remote_dir)

    for item in os.listdir(local_dir):
        local_path = os.path.join(local_dir, item)
        if os.path.isfile(local_path):
            print(f"  -> Uploading: {item}")
            with open(local_path, 'rb') as f:
                ftp.storbinary(f'STOR {item}', f)
        elif os.path.isdir(local_path):
            try:
                ftp.mkd(item)
            except Exception:
                pass
            upload_directory(ftp, local_path, f"{remote_dir}/{item}")

def main():
    host = os.environ.get('HOSTINGER_FTP_HOST') or (sys.argv[1] if len(sys.argv) > 1 else None)
    user = os.environ.get('HOSTINGER_FTP_USER') or (sys.argv[2] if len(sys.argv) > 2 else None)
    password = os.environ.get('HOSTINGER_FTP_PASS') or (sys.argv[3] if len(sys.argv) > 3 else None)
    remote_root = os.environ.get('HOSTINGER_REMOTE_DIR', 'public_html')

    if not host or not user or not password:
        print("[!] Missing Hostinger FTP Credentials.")
        print("Usage:")
        print("  python3 deploy_hostinger.py <FTP_HOST> <FTP_USER> <FTP_PASSWORD> [REMOTE_DIR]")
        print("Example:")
        print("  python3 deploy_hostinger.py ftp.twincityncrrealty.com u123456789 MySecretPassword public_html")
        sys.exit(1)

    print(f"[*] Connecting to Hostinger FTP: {host} (User: {user}) ...")
    try:
        ftp = FTP(host, timeout=30)
        ftp.login(user, password)
        print("[+] Login successful!")

        local_dist = os.path.abspath('dist')
        if not os.path.exists(local_dist):
            print("[!] dist/ folder not found. Please run 'npm run build' first.")
            sys.exit(1)

        upload_directory(ftp, local_dist, remote_root)
        ftp.quit()
        print("\n[✓] All website files successfully published to Hostinger public_html!")
    except Exception as e:
        print(f"[X] FTP Upload error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
